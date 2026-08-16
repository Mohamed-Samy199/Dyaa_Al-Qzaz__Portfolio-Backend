import { Router } from "express";
import * as videosController from "./videos.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createProjectSchema, updateProjectSchema } from "./videos.validation.js";

const router = Router();

router.get("/", videosController.getAllProjects);
router.get("/:id", videosController.getProjectById);

router.post("/", protect, validate(createProjectSchema), videosController.createProject);
router.patch("/:id", protect, validate(updateProjectSchema), videosController.updateProject);
router.delete("/:id", protect, videosController.deleteProject);

export default router;