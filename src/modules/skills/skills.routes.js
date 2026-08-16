import { Router } from "express";
import * as skillsController from "./skills.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createSkillSchema, updateSkillSchema } from "./skills.validation.js";

const router = Router();

// Public
router.get("/", skillsController.getAllSkills);
router.get("/:id", skillsController.getSkillById);

// Protected
router.post("/", protect, validate(createSkillSchema), skillsController.createSkill);
router.patch("/:id", protect, validate(updateSkillSchema), skillsController.updateSkill);
router.delete("/:id", protect, skillsController.deleteSkill);

export default router;