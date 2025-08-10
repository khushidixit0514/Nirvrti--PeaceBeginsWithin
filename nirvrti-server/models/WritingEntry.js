import mongoose from 'mongoose';

const writingEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }
);

const WritingEntry = mongoose.model('WritingEntry', writingEntrySchema);
export default WritingEntry;
