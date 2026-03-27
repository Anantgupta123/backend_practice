import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth.js';
import { authAPI } from '../services/endpoints.js';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [errors, setErrors] = useState({});

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!profileData.name) newErrors.name = 'Name is required';
    if (!profileData.phone) newErrors.phone = 'Phone is required';
    if (!/^[0-9]{10}$/.test(profileData.phone)) newErrors.phone = 'Phone must be 10 digits';
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.oldPassword) newErrors.oldPassword = 'Old password is required';
    if (!passwordData.newPassword) newErrors.newPassword = 'New password is required';
    if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateProfile();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await updateProfile(profileData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validatePassword();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await authAPI.changePassword(passwordData);
      toast.success('Password changed successfully!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
      setErrors({ passwordSubmit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-800 text-sm">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className={`input pl-10 ${errors.name ? 'input-error' : ''}`}
                  />
                </div>
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              <div>
                <label className="label">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="input pl-10 bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="label">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className={`input pl-10 ${errors.phone ? 'input-error' : ''}`}
                  />
                </div>
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>

              <div>
                <label className="label">Address</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    placeholder="Your address"
                    className="input pl-10"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full py-3 font-semibold"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>

          {/* Account Stats */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Account Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Total Bookings</span>
                  <span className="text-2xl font-bold text-blue-600">{user?.totalBookings || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Total Spent</span>
                  <span className="text-2xl font-bold text-green-600">₹{user?.totalSpent || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Member Since</span>
                  <span className="text-sm font-bold text-purple-600">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Security</h3>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="btn btn-secondary w-full flex items-center justify-center gap-2"
              >
                <FiLock /> Change Password
              </button>

              {showPasswordForm && (
                <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4 pt-4 border-t">
                  {errors.passwordSubmit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
                      {errors.passwordSubmit}
                    </div>
                  )}

                  <div>
                    <label className="label">Current Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      className={`input ${errors.oldPassword ? 'input-error' : ''}`}
                    />
                    {errors.oldPassword && <p className="error-text">{errors.oldPassword}</p>}
                  </div>

                  <div>
                    <label className="label">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      className={`input ${errors.newPassword ? 'input-error' : ''}`}
                    />
                    {errors.newPassword && <p className="error-text">{errors.newPassword}</p>}
                  </div>

                  <div>
                    <label className="label">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
                    />
                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary flex-1"
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(false)}
                      className="btn btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
