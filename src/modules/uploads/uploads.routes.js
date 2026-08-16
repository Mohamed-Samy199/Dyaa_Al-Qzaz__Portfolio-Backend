import { Router } from "express";
import * as uploadsController from "./uploads.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = Router();

router.post("/", protect, upload.single("file"), uploadsController.uploadSingleFile);

export default router;