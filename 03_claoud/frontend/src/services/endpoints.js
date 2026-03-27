import apiClient from './api.js';

// Auth APIs
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  getCurrentUser: () => apiClient.get('/auth/me'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
  changePassword: (data) => apiClient.post('/auth/change-password', data)
};

// Booking APIs
export const bookingAPI = {
  createBooking: (data) => apiClient.post('/bookings', data),
  getUserBookings: (status) => apiClient.get(`/bookings?status=${status || ''}`),
  getBookingById: (id) => apiClient.get(`/bookings/${id}`),
  cancelBooking: (id) => apiClient.put(`/bookings/${id}/cancel`),
  addRating: (data) => apiClient.post('/bookings/rating/add', data),
  getServiceRatings: (serviceType) => apiClient.get(`/bookings/ratings?serviceType=${serviceType || ''}`)
};

// Service APIs
export const serviceAPI = {
  getAllServices: () => apiClient.get('/services'),
  getServiceById: (id) => apiClient.get(`/services/${id}`)
};

// Admin APIs
export const adminAPI = {
  getDashboardStats: () => apiClient.get('/admin/stats'),
  getAllBookings: (status, page, limit) => 
    apiClient.get(`/admin/bookings?status=${status || ''}&page=${page || 1}&limit=${limit || 10}`),
  updateBookingStatus: (id, data) => apiClient.put(`/admin/bookings/${id}`, data),
  deleteBooking: (id) => apiClient.delete(`/admin/bookings/${id}`),
  getAllUsers: (page, limit) => apiClient.get(`/admin/users?page=${page || 1}&limit=${limit || 10}`),
  toggleUserStatus: (id, data) => apiClient.put(`/admin/users/${id}/toggle-status`, data),
  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`),
  createService: (data) => apiClient.post('/admin/services', data),
  updateService: (id, data) => apiClient.put(`/admin/services/${id}`, data),
  deleteService: (id) => apiClient.delete(`/admin/services/${id}`)
};
