import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  addRating,
  getServiceRatings
} from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/', createBooking);
router.get('/', getUserBookings);
router.get('/ratings', getServiceRatings);
router.get('/:bookingId', getBookingById);
router.put('/:bookingId/cancel', cancelBooking);
router.post('/rating/add', addRating);

export default router;
