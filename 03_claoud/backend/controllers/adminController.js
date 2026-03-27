import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Service from '../models/Service.js';
import sendResponse from '../utils/responseFormatter.js';

// Get dashboard statistics
const getDashboardStats = async (req, res, next) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalServices = await Service.countDocuments({ isActive: true });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    // Calculate revenue (sum of actual costs)
    const revenue = await Booking.aggregate([
      {
        $match: { status: 'completed', actualCost: { $ne: null } }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$actualCost' }
        }
      }
    ]);

    const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;

    return sendResponse(res, 200, true, 'Dashboard stats fetched', {
      totalBookings,
      totalUsers,
      totalServices,
      pendingBookings,
      completedBookings,
      totalRevenue
    });
  } catch (error) {
    next(error);
  }
};

// Get all bookings (admin)
const getAllBookings = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const bookings = await Booking.find(query)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(query);

    return sendResponse(res, 200, true, 'All bookings fetched', {
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalBookings: total
    });
  } catch (error) {
    next(error);
  }
};

// Update booking status
const updateBookingStatus = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const { status, assignedTechnician, notes, actualCost } = req.body;

    if (!status) {
      return sendResponse(res, 400, false, 'Please provide status');
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return sendResponse(res, 404, false, 'Booking not found');
    }

    booking.status = status;

    if (assignedTechnician) booking.assignedTechnician = assignedTechnician;
    if (notes) booking.notes = notes;
    if (actualCost) booking.actualCost = actualCost;

    if (status === 'completed') {
      booking.completedDate = new Date();
    }

    await booking.save();

    return sendResponse(res, 200, true, 'Booking status updated', booking);
  } catch (error) {
    next(error);
  }
};

// Delete booking
const deleteBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      return sendResponse(res, 404, false, 'Booking not found');
    }

    // Decrease user booking count
    await User.findByIdAndUpdate(booking.userId, {
      $inc: { totalBookings: -1 }
    });

    return sendResponse(res, 200, true, 'Booking deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Get all users (admin)
const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const users = await User.find({ role: 'user' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({ role: 'user' });

    return sendResponse(res, 200, true, 'All users fetched', {
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalUsers: total
    });
  } catch (error) {
    next(error);
  }
};

// Block/Unblock user
const toggleUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    );

    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    const message = isActive ? 'User activated' : 'User deactivated';

    return sendResponse(res, 200, true, message, user);
  } catch (error) {
    next(error);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Don't allow deleting other admins or yourself
    const user = await User.findById(userId);

    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    if (user.role === 'admin' && user._id.toString() !== req.userId) {
      return sendResponse(res, 403, false, 'Cannot delete admin accounts');
    }

    await User.findByIdAndDelete(userId);

    // Delete all bookings for this user
    await Booking.deleteMany({ userId });

    return sendResponse(res, 200, true, 'User and their bookings deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Manage services
const createService = async (req, res, next) => {
  try {
    const { name, description, basePrice, duration, features } = req.body;

    if (!name || !description || !basePrice || !duration) {
      return sendResponse(res, 400, false, 'Please provide all required fields');
    }

    const service = new Service({
      name,
      description,
      basePrice,
      duration,
      features: features || []
    });

    await service.save();

    return sendResponse(res, 201, true, 'Service created successfully', service);
  } catch (error) {
    next(error);
  }
};

// Update service
const updateService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const { name, description, basePrice, duration, features, isActive } = req.body;

    const service = await Service.findByIdAndUpdate(
      serviceId,
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(basePrice && { basePrice }),
        ...(duration && { duration }),
        ...(features && { features }),
        ...(isActive !== undefined && { isActive })
      },
      { new: true, runValidators: true }
    );

    if (!service) {
      return sendResponse(res, 404, false, 'Service not found');
    }

    return sendResponse(res, 200, true, 'Service updated successfully', service);
  } catch (error) {
    next(error);
  }
};

// Delete service
const deleteService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findByIdAndDelete(serviceId);

    if (!service) {
      return sendResponse(res, 404, false, 'Service not found');
    }

    return sendResponse(res, 200, true, 'Service deleted successfully');
  } catch (error) {
    next(error);
  }
};

export {
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
};
