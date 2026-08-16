import { Router } from "express";
import * as reelsController from "./reels.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createReelSchema, updateReelSchema } from "./reels.validation.js";

const router = Router();

router.get("/", reelsController.getAllReels);
router.get("/:id", reelsController.getReelById);

router.post("/", protect, validate(createReelSchema), reelsController.createReel);
router.patch("/:id", protect, validate(updateReelSchema), reelsController.updateReel);
router.delete("/:id", protect, reelsController.deleteReel);

export default router;