import mongoose from "mongoose";
const { Schema } = mongoose;

const ALLOWED_SKILL_ICONS = ["PlayCircle", "Layers", "Video", "Palette", "Mic2"];

const workItemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Work title is required."],
      trim: true,
      maxlength: 150,
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required."],
    },
    videoUrl: {
      type: String,
      trim: true,
      default: null, // external link (YouTube etc.)
    },
    videoFile: {
      type: String,
      trim: true,
      default: null, // uploaded local video url
    },
  },
  { _id: false }
);

const skillSchema = new Schema(
  {
    order: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: [true, "Label is required."],
      trim: true,
      maxlength: 60, // e.g. "MOTION GRAPHICS"
    },
    heading: {
      type: String,
      required: [true, "Heading is required."],
      trim: true,
      maxlength: 60, // e.g. "Motion Graphics"
    },
    icon: {
      type: String,
      enum: ALLOWED_SKILL_ICONS,
      required: true,
    },
    works: {
      type: [workItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

skillSchema.index({ order: 1 });

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
export { ALLOWED_SKILL_ICONS };