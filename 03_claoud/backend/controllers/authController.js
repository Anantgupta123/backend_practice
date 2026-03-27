import User from '../models/User.js';
import { generateToken } from '../utils/tokenUtils.js';
import sendResponse from '../utils/responseFormatter.js';
import { validateEmail, validatePhone, validatePassword } from '../utils/validators.js';

// Register a new user
const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, phone, address } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword || !phone) {
      return sendResponse(res, 400, false, 'Please provide all required fields');
    }

    if (password !== confirmPassword) {
      return sendResponse(res, 400, false, 'Passwords do not match');
    }

    if (!validateEmail(email)) {
      return sendResponse(res, 400, false, 'Invalid email format');
    }

    if (!validatePhone(phone)) {
      return sendResponse(res, 400, false, 'Phone number must be 10 digits');
    }

    if (!validatePassword(password)) {
      return sendResponse(res, 400, false, 'Password must be at least 6 characters');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, false, 'Email already registered. Please login.');
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      phone,
      address: address || ''
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const user = newUser.toJSON();

    return sendResponse(res, 201, true, 'Registration successful', {
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return sendResponse(res, 400, false, 'Please provide email and password');
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return sendResponse(res, 401, false, 'Invalid email or password');
    }

    if (!user.isActive) {
      return sendResponse(res, 403, false, 'Your account has been deactivated');
    }

    // Generate token
    const token = generateToken(user);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const userData = user.toJSON();

    return sendResponse(res, 200, true, 'Login successful', {
      user: userData,
      token
    });
  } catch (error) {
    next(error);
  }
};

// Logout user
const logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    return sendResponse(res, 200, true, 'Logout successful');
  } catch (error) {
    next(error);
  }
};

// Get current user
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    return sendResponse(res, 200, true, 'User fetched successfully', user);
  } catch (error) {
    next(error);
  }
};

// Update user profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    if (name) user.name = name;
    if (phone) {
      if (!validatePhone(phone)) {
        return sendResponse(res, 400, false, 'Invalid phone number');
      }
      user.phone = phone;
    }
    if (address) user.address = address;

    await user.save();

    return sendResponse(res, 200, true, 'Profile updated successfully', user);
  } catch (error) {
    next(error);
  }
};

// Change password
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return sendResponse(res, 400, false, 'Please provide all required fields');
    }

    if (newPassword !== confirmPassword) {
      return sendResponse(res, 400, false, 'New passwords do not match');
    }

    if (!validatePassword(newPassword)) {
      return sendResponse(res, 400, false, 'Password must be at least 6 characters');
    }

    const user = await User.findById(req.userId).select('+password');

    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
      return sendResponse(res, 401, false, 'Old password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    return sendResponse(res, 200, true, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};

export { register, login, logout, getCurrentUser, updateProfile, changePassword };
