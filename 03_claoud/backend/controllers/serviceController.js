import Service from '../models/Service.js';
import sendResponse from '../utils/responseFormatter.js';

// Get all services
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });

    return sendResponse(res, 200, true, 'Services fetched successfully', services);
  } catch (error) {
    next(error);
  }
};

// Get service by ID
const getServiceById = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId);

    if (!service) {
      return sendResponse(res, 404, false, 'Service not found');
    }

    return sendResponse(res, 200, true, 'Service fetched successfully', service);
  } catch (error) {
    next(error);
  }
};

export { getAllServices, getServiceById };
