import mongoose from "mongoose";
const { Schema } = mongoose;

const ALLOWED_ICONS = ["Zap", "Film", "Palette", "Video", "Mic", "PenTool", "Camera", "Sparkles"];

const skillItemSchema = new Schema(
  {
    icon: {
      type: String,
      enum: ALLOWED_ICONS,
      required: [true, "Icon is required."],
    },
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      maxlength: 60,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      maxlength: 200,
    },
  },
  { _id: false }
);

const aboutSectionSchema = new Schema(
  {
    label: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "Visual Origin Story",
    },
    headingLine1: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "I Turn Static Ideas Into",
    },
    headingHighlight: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "Kinetic Experiences.",
    },
    bio: {
      type: String,
      required: [true, "Bio is required."],
      trim: true,
      maxlength: 800,
    },
    skills: {
      type: [skillItemSchema],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 6,
        message: "You can add up to 6 mini skill cards.",
      },
    },
  },
  { timestamps: true }
);

const AboutSection = mongoose.model("AboutSection", aboutSectionSchema);
export default AboutSection;
export { ALLOWED_ICONS };