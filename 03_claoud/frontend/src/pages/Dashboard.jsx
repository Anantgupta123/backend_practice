import React, { useState, useEffect } from 'react';
import { FiCalendar, FiMapPin, FiPhone, FiX, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import { bookingAPI, serviceAPI } from '../services/endpoints.js';
import { toast } from 'react-toastify';
import RatingModal from '../components/RatingModal.jsx';
import { LoadingSpinner, ErrorAlert } from '../components/UIComponents.jsx';

const Dashboard = () => {
  const [bookings, bookingsState] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [ratingModal, setRatingModal] = useState({ isOpen: false, bookingId: null });
  const [ratingLoading, setRatingLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    serviceType: '',
    description: '',
    address: '',
    phone: '',
    bookingDate: ''
  });

  // Fetch bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bookingsRes, servicesRes] = await Promise.all([
          bookingAPI.getUserBookings(filterStatus),
          serviceAPI.getAllServices()
        ]);
        bookingsState(bookingsRes.data || []);
        setServices(servicesRes.data || []);
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterStatus]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateBooking = () => {
    const newErrors = {};
    if (!formData.serviceType) newErrors.serviceType = 'Select a service';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.bookingDate) newErrors.bookingDate = 'Select a date';
    return newErrors;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateBooking();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await bookingAPI.createBooking(formData);
      toast.success('Booking created successfully! ✓');
      bookingsState(prev => [response.data, ...prev]);
      setFormData({
        serviceType: '',
        description: '',
        address: '',
        phone: '',
        bookingDate: ''
      });
      setShowBookingForm(false);
    } catch (error) {
      toast.error(error.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingAPI.cancelBooking(bookingId);
      toast.success('Booking cancelled');
      bookingsState(prev => prev.map(b => 
        b._id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
    } catch (error) {
      toast.error(error.message || 'Failed to cancel booking');
    }
  };

  const handleRateBooking = async (data) => {
    try {
      setRatingLoading(true);
      await bookingAPI.addRating(data);
      toast.success('Thank you for your review!');
      setRatingModal({ isOpen: false, bookingId: null });
      bookingsState(prev => prev.map(b =>
        b._id === data.bookingId ? { ...b, rating: data.rating, review: data.review } : b
      ));
    } catch (error) {
      toast.error(error.message || 'Failed to add rating');
    } finally {
      setRatingLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-cyan-100 text-cyan-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      confirmed: '✓',
      'in-progress': '🔧',
      completed: '✓✓',
      cancelled: '✗'
    };
    return icons[status] || '•';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Bookings</h1>
          <button
            onClick={() => setShowBookingForm(!showBookingForm)}
            className="btn btn-primary py-3 px-6"
          >
            {showBookingForm ? 'Cancel' : '+ New Booking'}
          </button>
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <div className="card bg-blue-50 border-2 border-blue-200 mb-8 fade-in">
            <h2 className="text-2xl font-bold mb-6">Book a Service</h2>
            {errors.submit && <ErrorAlert message={errors.submit} />}

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Service Type *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleBookingChange}
                    className={`input ${errors.serviceType ? 'input-error' : ''}`}
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service._id} value={service.name}>
                        {service.name} - ₹{service.basePrice}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && <p className="error-text">{errors.serviceType}</p>}
                </div>

                <div>
                  <label className="label">Booking Date *</label>
                  <input
                    type="datetime-local"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleBookingChange}
                    className={`input ${errors.bookingDate ? 'input-error' : ''}`}
                  />
                  {errors.bookingDate && <p className="error-text">{errors.bookingDate}</p>}
                </div>

                <div>
                  <label className="label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleBookingChange}
                    placeholder="1234567890"
                    className={`input ${errors.phone ? 'input-error' : ''}`}
                  />
                  {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>

                <div>
                  <label className="label">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleBookingChange}
                    placeholder="Your service address"
                    className={`input ${errors.address ? 'input-error' : ''}`}
                  />
                  {errors.address && <p className="error-text">{errors.address}</p>}
                </div>
              </div>

              <div>
                <label className="label">Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleBookingChange}
                  placeholder="Describe your issue..."
                  rows={3}
                  className="input"
                />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary flex-1" disabled={loading}>
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus('')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === '' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Bookings
          </button>
          {['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                filterStatus === status ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {loading ? (
          <LoadingSpinner />
        ) : bookings.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No bookings yet</p>
            <button
              onClick={() => setShowBookingForm(true)}
              className="btn btn-primary"
            >
              Book a Service
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking._id} className="card hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 capitalize">
                      {getStatusIcon(booking.status)} {booking.serviceType}
                    </h3>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{booking.estimatedCost}</p>
                    <p className="text-sm text-gray-600">Estimated Cost</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-blue-600" />
                    <span>{new Date(booking.bookingDate).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-blue-600" />
                    <span>{booking.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-blue-600" />
                    <span>{booking.phone}</span>
                  </div>
                  {booking.assignedTechnician && (
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">👨‍🔧</span>
                      <span>{booking.assignedTechnician}</span>
                    </div>
                  )}
                </div>

                {booking.notes && (
                  <div className="bg-blue-50 p-3 rounded mb-4 text-sm">
                    <p className="font-semibold">Notes:</p>
                    <p>{booking.notes}</p>
                  </div>
                )}

                {booking.rating && (
                  <div className="bg-green-50 p-3 rounded mb-4">
                    <p className="flex items-center gap-2 font-semibold text-green-700">
                      <FiStar className="fill-yellow-400" /> {booking.rating}/5 Stars
                    </p>
                    <p className="text-sm italic mt-1">{booking.review}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn btn-danger flex-1 flex items-center justify-center gap-2"
                    >
                      <FiX /> Cancel
                    </button>
                  )}
                  {booking.status === 'completed' && !booking.rating && (
                    <button
                      onClick={() => setRatingModal({ isOpen: true, bookingId: booking._id })}
                      className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <FiStar /> Rate Service
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <RatingModal
        isOpen={ratingModal.isOpen}
        onClose={() => setRatingModal({ isOpen: false, bookingId: null })}
        onSubmit={handleRateBooking}
        bookingId={ratingModal.bookingId}
        loading={ratingLoading}
      />
    </div>
  );
};

export default Dashboard;
