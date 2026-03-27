import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Rating from '../models/Rating.js';
import sendResponse from '../utils/responseFormatter.js';

// Create a new booking
const createBooking = async (req, res, next) => {
  try {
    const { serviceType, description, address, phone, bookingDate } = req.body;

    if (!serviceType || !address || !phone || !bookingDate) {
      return sendResponse(res, 400, false, 'Please provide all required fields');
    }

    // Check if booking date is in the future
    const bookingDateObj = new Date(bookingDate);
    if (bookingDateObj < new Date()) {
      return sendResponse(res, 400, false, 'Booking date must be in the future');
    }

    const booking = new Booking({
      userId: req.userId,
      serviceType,
      description: description || '',
      address,
      phone,
      bookingDate: bookingDateObj,
      estimatedCost: getEstimatedCost(serviceType)
    });

    await booking.save();

    // Update user booking count
    await User.findByIdAndUpdate(req.userId, {
      $inc: { totalBookings: 1 }
    });

    // Populate user info
    await booking.populate('userId', 'name email phone');

    return sendResponse(res, 201, true, 'Booking created successfully', booking);
  } catch (error) {
    next(error);
  }
};

// Get all bookings for a user
const getUserBookings = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { userId: req.userId };

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    return sendResponse(res, 200, true, 'Bookings fetched successfully', bookings);
  } catch (error) {
    next(error);
  }
};

// Get a single booking
const getBookingById = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId).populate('userId', 'name email phone');

    if (!booking) {
      return sendResponse(res, 404, false, 'Booking not found');
    }

    // Check if user owns this booking
    if (booking.userId._id.toString() !== req.userId && req.userRole !== 'admin') {
      return sendResponse(res, 403, false, 'You do not have permission to view this booking');
    }

    return sendResponse(res, 200, true, 'Booking fetched successfully', booking);
  } catch (error) {
    next(error);
  }
};

// Cancel booking
const cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return sendResponse(res, 404, false, 'Booking not found');
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return sendResponse(res, 403, false, 'You do not have permission to cancel this booking');
    }

    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return sendResponse(res, 400, false, 'Cannot cancel a completed or already cancelled booking');
    }

    booking.status = 'cancelled';
    await booking.save();

    return sendResponse(res, 200, true, 'Booking cancelled successfully', booking);
  } catch (error) {
    next(error);
  }
};

// Add rating and review to a booking
const addRating = async (req, res, next) => {
  try {
    const { bookingId, rating, review } = req.body;

    if (!bookingId || !rating || !review) {
      return sendResponse(res, 400, false, 'Please provide all required fields');
    }

    if (rating < 1 || rating > 5) {
      return sendResponse(res, 400, false, 'Rating must be between 1 and 5');
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return sendResponse(res, 404, false, 'Booking not found');
    }

    if (booking.status !== 'completed') {
      return sendResponse(res, 400, false, 'Can only rate completed bookings');
    }

    if (booking.userId.toString() !== req.userId) {
      return sendResponse(res, 403, false, 'You can only rate your own bookings');
    }

    // Check if already rated
    const existingRating = await Rating.findOne({ bookingId });
    if (existingRating) {
      return sendResponse(res, 400, false, 'You have already rated this booking');
    }

    // Create rating
    const newRating = new Rating({
      bookingId,
      userId: req.userId,
      rating,
      review
    });

    await newRating.save();

    // Update booking with rating
    booking.rating = rating;
    booking.review = review;
    await booking.save();

    return sendResponse(res, 201, true, 'Rating added successfully', newRating);
  } catch (error) {
    next(error);
  }
};

// Get ratings for a service
const getServiceRatings = async (req, res, next) => {
  try {
    const { serviceType } = req.query;

    const query = {};
    if (serviceType) {
      // Get bookings for the service type
      const bookingIds = (await Booking.find({ serviceType })).map(b => b._id);
      query.bookingId = { $in: bookingIds };
    }

    const ratings = await Rating.find(query)
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    const averageRating = ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
      : 0;

    return sendResponse(res, 200, true, 'Ratings fetched successfully', {
      ratings,
      averageRating,
      totalRatings: ratings.length
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to calculate estimated cost
const getEstimatedCost = (serviceType) => {
  const costs = {
    'installation': 5000,
    'repair': 2000,
    'gas-refill': 1500,
    'maintenance': 1000,
    'cleaning': 800
  };
  return costs[serviceType] || 0;
};

export { createBooking, getUserBookings, getBookingById, cancelBooking, addRating, getServiceRatings };
