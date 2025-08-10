import express from "express";
import { getStories, createStory, deleteStory } from "../controllers/storyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getStories)
  .post(protect, createStory);

router.route("/:id")
  .delete(protect, deleteStory);

export default router;
