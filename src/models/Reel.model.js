import mongoose from "mongoose";
const { Schema } = mongoose;

const reelSchema = new Schema(
  {
    order: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      maxlength: 150,
    },
    category: {
      type: String,
      required: [true, "AI model/source is required."],
      trim: true,
      maxlength: 100, // e.g. "Runway Gen-2", "Stable Diffusion", "Sora AI"
    },
    videoUrl: {
      type: String,
      required: [true, "Video is required."],
    },
    duration: {
      type: String,
      required: [true, "Duration is required."],
      trim: true,
      maxlength: 10, // e.g. "0:34"
    },
  },
  { timestamps: true }
);

reelSchema.index({ order: 1 });

const Reel = mongoose.model("Reel", reelSchema);
export default Reel;