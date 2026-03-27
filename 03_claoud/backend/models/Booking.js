import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    serviceType: {
      type: String,
      enum: ['installation', 'repair', 'gas-refill', 'maintenance', 'cleaning'],
      required: [true, 'Please select a service type']
    },
    description: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Please provide an address']
    },
    phone: {
      type: String,
      required: true
    },
    bookingDate: {
      type: Date,
      required: [true, 'Please select a booking date']
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'pending'
    },
    assignedTechnician: {
      type: String,
      default: null
    },
    estimatedCost: {
      type: Number,
      default: 0
    },
    actualCost: {
      type: Number,
      default: null
    },
    notes: {
      type: String,
      default: null
    },
    completedDate: {
      type: Date,
      default: null
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null
    },
    review: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

// Index for faster queries
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ bookingDate: 1 });

export default mongoose.model('Booking', bookingSchema);
