import express from 'express';
import { getAllServices, getServiceById } from '../controllers/serviceController.js';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:serviceId', getServiceById);

export default router;
