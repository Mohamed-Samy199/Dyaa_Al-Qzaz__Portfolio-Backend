import { Router } from "express";
import * as reviewsController from "./reviews.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createReviewSchema, updateReviewSchema } from "./reviews.validation.js";

const router = Router();

router.get("/", reviewsController.getAllReviews);
router.get("/:id", reviewsController.getReviewById);

router.post("/", protect, validate(createReviewSchema), reviewsController.createReview);
router.patch("/:id", protect, validate(updateReviewSchema), reviewsController.updateReview);
router.delete("/:id", protect, reviewsController.deleteReview);

export default router;