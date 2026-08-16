import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema(
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
      required: [true, "Category is required."],
      trim: true,
      maxlength: 100,
    },
    image: {
      type: String,
      required: [true, "Thumbnail image is required."],
    },
    video: {
      type: String,
      required: [true, "Video is required."],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 6,
        message: "You can add up to 6 tags.",
      },
    },
    year: {
      type: String,
      required: [true, "Year is required."],
      trim: true,
      maxlength: 4,
    },
  },
  { timestamps: true }
);

projectSchema.index({ order: 1 });

const Project = mongoose.model("Project", projectSchema);
export default Project;