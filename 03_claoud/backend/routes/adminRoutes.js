import express from 'express';
import {
  getDashboardStats,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  getAllUsers,
  toggleUserStatus,
  deleteUser,
  createService,
  updateService,
  deleteService
} from '../controllers/adminController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

// Dashboard
router.get('/stats', getDashboardStats);

// Bookings management
router.get('/bookings', getAllBookings);
router.put('/bookings/:bookingId', updateBookingStatus);
router.delete('/bookings/:bookingId', deleteBooking);

// Users management
router.get('/users', getAllUsers);
router.put('/users/:userId/toggle-status', toggleUserStatus);
router.delete('/users/:userId', deleteUser);

// Services management
router.post('/services', createService);
router.put('/services/:serviceId', updateService);
router.delete('/services/:serviceId', deleteService);

export default router;
