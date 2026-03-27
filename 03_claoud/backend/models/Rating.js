import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
      unique: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: 1,
      max: 5
    },
    review: {
      type: String,
      required: [true, 'Please provide a review'],
      minlength: 10,
      maxlength: 1000
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Index for faster queries
ratingSchema.index({ userId: 1 });
ratingSchema.index({ bookingId: 1 });

export default mongoose.model('Rating', ratingSchema);
