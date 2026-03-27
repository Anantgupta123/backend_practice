import React, { useState, useEffect } from 'react';
import { FiBarChart2, FiUsers, FiCalendar, FiDollarSign, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import { adminAPI } from '../services/endpoints.js';
import { toast } from 'react-toastify';
import { LoadingSpinner, ErrorAlert } from '../components/UIComponents.jsx';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [bookingFilter, setBookingFilter] = useState('');

  const [editData, setEditData] = useState({
    status: '',
    assignedTechnician: '',
    actualCost: '',
    notes: ''
  });

  // Fetch Dashboard Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminAPI.getDashboardStats();
        setStats(response.data);
      } catch (error) {
        toast.error('Failed to load stats');
      }
    };
    fetchStats();
  }, []);

  // Fetch Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getAllBookings(bookingFilter, 1, 20);
        setBookings(response.data.bookings || []);
      } catch (error) {
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'bookings') {
      fetchBookings();
    }
  }, [activeTab, bookingFilter]);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getAllUsers(1, 20);
        setUsers(response.data.users || []);
      } catch (error) {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  const handleEditBooking = (booking) => {
    setEditingBooking(booking._id);
    setEditData({
      status: booking.status,
      assignedTechnician: booking.assignedTechnician || '',
      actualCost: booking.actualCost || '',
      notes: booking.notes || ''
    });
  };

  const handleSaveBooking = async () => {
    try {
      await adminAPI.updateBookingStatus(editingBooking, editData);
      toast.success('Booking updated successfully');
      setBookings(prev => prev.map(b =>
        b._id === editingBooking ? { ...b, ...editData } : b
      ));
      setEditingBooking(null);
    } catch (error) {
      toast.error(error.message || 'Failed to update booking');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Delete this booking permanently?')) return;

    try {
      await adminAPI.deleteBooking(bookingId);
      toast.success('Booking deleted');
      setBookings(prev => prev.filter(b => b._id !== bookingId));
    } catch (error) {
      toast.error(error.message || 'Failed to delete booking');
    }
  };

  const handleToggleUserStatus = async (userId, isActive) => {
    try {
      await adminAPI.toggleUserStatus(userId, { isActive: !isActive });
      toast.success(isActive ? 'User deactivated' : 'User activated');
      setUsers(prev => prev.map(u =>
        u._id === userId ? { ...u, isActive: !isActive } : u
      ));
    } catch (error) {
      toast.error(error.message || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user and all their bookings?')) return;

    try {
      await adminAPI.deleteUser(userId);
      toast.success('User deleted');
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (error) {
      toast.error(error.message || 'Failed to delete user');
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className={`card ${color}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <Icon className="text-2xl text-opacity-50" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-6 font-semibold border-b-2 transition ${
              activeTab === 'dashboard'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-6 font-semibold border-b-2 transition ${
              activeTab === 'bookings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-3 px-6 font-semibold border-b-2 transition ${
              activeTab === 'users'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Users
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Overview</h2>
            <div className="grid_4">
              <StatCard
                icon={FiCalendar}
                title="Total Bookings"
                value={stats.totalBookings}
                color="bg-blue-50"
              />
              <StatCard
                icon={FiUsers}
                title="Total Users"
                value={stats.totalUsers}
                color="bg-green-50"
              />
              <StatCard
                icon={FiCheck}
                title="Completed"
                value={stats.completedBookings}
                color="bg-green-100"
              />
              <StatCard
                icon={FiDollarSign}
                title="Total Revenue"
                value={`₹${stats.totalRevenue}`}
                color="bg-yellow-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Status Distribution</h3>
                <div className="space-y-3">
                  {[
                    { status: 'Pending', count: stats.pendingBookings, color: 'bg-yellow-400' },
                    { status: 'Completed', count: stats.completedBookings, color: 'bg-green-400' }
                  ].map(item => (
                    <div key={item.status} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="flex-1">{item.status}</span>
                      <span className="font-bold">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              {['', 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => setBookingFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                    bookingFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {status || 'All'}
                </button>
              ))}
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="space-y-3">
                {bookings.map(booking => (
                  <div key={booking._id} className="card">
                    {editingBooking === booking._id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="label">Status</label>
                            <select
                              value={editData.status}
                              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                              className="input"
                            >
                              {['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="label">Assigned Technician</label>
                            <input
                              type="text"
                              value={editData.assignedTechnician}
                              onChange={(e) => setEditData({ ...editData, assignedTechnician: e.target.value })}
                              className="input"
                              placeholder="Technician name"
                            />
                          </div>
                          <div>
                            <label className="label">Actual Cost</label>
                            <input
                              type="number"
                              value={editData.actualCost}
                              onChange={(e) => setEditData({ ...editData, actualCost: e.target.value })}
                              className="input"
                              placeholder="Cost"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="label">Notes</label>
                          <textarea
                            value={editData.notes}
                            onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                            className="input"
                            rows={2}
                            placeholder="Service notes..."
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveBooking}
                            className="btn btn-primary flex-1"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingBooking(null)}
                            className="btn btn-secondary flex-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg">{booking.serviceType}</h3>
                            <p className="text-sm text-gray-600">{booking.userId?.name} • {booking.userId?.email}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                            booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1 mb-3">
                          <p>Address: {booking.address}</p>
                          <p>Date: {new Date(booking.bookingDate).toLocaleString()}</p>
                          {booking.assignedTechnician && <p>Technician: {booking.assignedTechnician}</p>}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditBooking(booking)}
                            className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                          >
                            <FiEdit2 /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBooking(booking._id)}
                            className="btn btn-danger flex-1 flex items-center justify-center gap-2"
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-3">
            {loading ? (
              <LoadingSpinner />
            ) : (
              users.map(user => (
                <div key={user._id} className="card">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-600">{user.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">Bookings: {user.totalBookings}</p>
                      <p className={`text-sm font-semibold ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {user.isActive ? '✓ Active' : '✗ Inactive'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                      className={`btn flex-1 ${user.isActive ? 'btn-danger' : 'btn-success'}`}
                    >
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-danger flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
