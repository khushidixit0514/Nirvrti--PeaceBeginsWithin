import WritingEntry from '../models/WritingEntry.js';

export const createEntry = async (req, res) => {
  try {
    const { content } = req.body;
    const newEntry = await WritingEntry.create({
      user: req.user._id,
      content,
      createdAt: new Date(),
    });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEntries = async (req, res) => {
  try {
    const entries = await WritingEntry.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const entry = await WritingEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    if (entry.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: 'Not authorized' });

    await entry.deleteOne();  // <--- change here
    res.json({ message: 'Entry removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
