import mongoose from "mongoose";
const { Schema } = mongoose;

const heroSectionSchema = new Schema(
  {
    heroImage: {
      type: String,
      required: [true, "Hero image is required."],
    },
    cvUrl: {
      type: String,
      required: [true, "CV file is required."],
    },
    showreelVideoUrl: {
      type: String,
      required: [true, "Showreel video is required."],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    badgeText: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "Top Rated Freelancer",
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  { timestamps: true }
);

const HeroSection = mongoose.model("HeroSection", heroSectionSchema);
export default HeroSection;