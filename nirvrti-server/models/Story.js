import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  anonymous: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const Story = mongoose.model("Story", storySchema);
export default Story;
