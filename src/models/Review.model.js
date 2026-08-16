import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    order: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Review screenshot is required."],
    },
    alt: {
      type: String,
      required: [true, "Alt text is required."],
      trim: true,
      maxlength: 200,
    },
    platform: {
      type: String,
      required: [true, "Platform is required."],
      trim: true,
      maxlength: 50, // e.g. مستقل، خمسات، Upwork، Fiverr
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ order: 1 });

const Review = mongoose.model("Review", reviewSchema);
export default Review;