import { Router } from "express";
import * as heroController from "./hero.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { updateHeroSchema } from "./hero.validation.js";

const router = Router();

router.get("/", heroController.getHero);
router.patch("/", protect, validate(updateHeroSchema), heroController.updateHero);

export default router;