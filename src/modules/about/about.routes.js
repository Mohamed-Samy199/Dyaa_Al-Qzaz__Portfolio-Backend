import { Router } from "express";
import * as aboutController from "./about.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { updateAboutSchema } from "./about.validation.js";

const router = Router();

router.get("/", aboutController.getAbout);
router.patch("/", protect, validate(updateAboutSchema), aboutController.updateAbout);

export default router;