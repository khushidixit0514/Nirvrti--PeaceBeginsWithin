import CapsuleEntry from '../models/CapsuleEntry.js';

export const createCapsule = async (req, res) => {
  try {
       const { title, content, openDate, mood, tags, privacy, password } = req.body;
   const newCapsule = await CapsuleEntry.create({
      user: req.user._id,
      title,
      content,
      openDate: openDate || null,
      mood,
      tags,
      privacy,
      password: privacy === "password" ? password : null,
      createdAt: new Date(),
    });
    res.status(201).json(newCapsule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCapsules = async (req, res) => {
  try {
    const capsules = await CapsuleEntry.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(capsules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCapsule = async (req, res) => {
  try {
    const capsule = await CapsuleEntry.findById(req.params.id);
    if (!capsule) return res.status(404).json({ message: 'Capsule not found' });
    if (capsule.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: 'Not authorized' });

   await CapsuleEntry.findByIdAndDelete(req.params.id);

    res.json({ message: 'Capsule removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
