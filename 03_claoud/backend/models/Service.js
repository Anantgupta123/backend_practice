import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide service name'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide service description']
    },
    icon: {
      type: String,
      default: null
    },
    basePrice: {
      type: Number,
      required: [true, 'Please provide base price']
    },
    duration: {
      type: String,
      required: true,
      enum: ['30 mins', '1 hour', '2 hours', '4 hours', '1 day']
    },
    features: [{
      type: String
    }],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
