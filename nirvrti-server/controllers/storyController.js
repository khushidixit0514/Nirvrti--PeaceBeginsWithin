import Story from "../models/Story.js";

// Get all or only user's stories
export const getStories = async (req, res) => {
  try {
    const userOnly = req.query.userOnly === "true";
    const filter = userOnly ? { user: req.user._id } : {};

    const stories = await Story.find(filter).sort({ date: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new story
export const createStory = async (req, res) => {
  try {
    const { title, content, category, author, anonymous } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const excerpt =
      content.length > 60 ? content.slice(0, 60) + "..." : content;

    const story = new Story({
      user: req.user._id,
      title,
      content,
      category,
      excerpt,
      author: anonymous ? "Anonymous" : author || req.user.username || "Anonymous",
      anonymous,
    });

    const savedStory = await story.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a story
export const deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Only owner can delete
    if (story.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to delete this story" });
    }

    await story.deleteOne();
    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting story", error: error.message });
  }
};