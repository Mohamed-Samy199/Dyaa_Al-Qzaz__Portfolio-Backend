// import cloudinary from "../../config/cloudinary.config.js";
// import { ApiError } from "../../utils/ApiError.js";

// const getResourceType = (mimetype) => {
//   if (mimetype.startsWith("image/")) return "image";
//   if (mimetype.startsWith("video/")) return "video";
//   return "raw"; // PDF وباقي الملفات
// };

// export const uploadToCloudinary = (file) => {
//   return new Promise((resolve, reject) => {
//     const resourceType = getResourceType(file.mimetype);

//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder: "dyaa-motion",
//         resource_type: resourceType,
//       },
//       (error, result) => {
//         if (error) return reject(ApiError.internal("Upload to Cloudinary failed."));
//         resolve({
//           url: result.secure_url,
//           publicId: result.public_id,
//           resourceType: result.resource_type,
//         });
//       }
//     );

//     stream.end(file.buffer);
//   });
// };

// export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
//   return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
// };





import cloudinary from "../../config/cloudinary.config.js";
import { ApiError } from "../../utils/ApiError.js";

const getResourceType = (mimetype) => {
  if (mimetype.startsWith("image/")) return "image";
  if (mimetype.startsWith("video/")) return "video";
  return "raw"; // PDF وباقي الملفات
};

export const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const resourceType = getResourceType(file.mimetype);

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "dyaa-motion",
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(ApiError.internal("Upload to Cloudinary failed."));
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          resourceType: result.resource_type,
        });
      }
    );

    stream.end(file.buffer);
  });
};

export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};