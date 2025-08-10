import mongoose from 'mongoose';

const capsuleEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },  
  openDate: { type: Date, required: false }, 
  mood: { type: String, default: "😊" },     
  tags: [String],                            
  privacy: { type: String, default: "private" }, 
  password: { type: String, default: null }, 
  createdAt: { type: Date, default: Date.now },
});

const CapsuleEntry = mongoose.model('CapsuleEntry', capsuleEntrySchema);
export default CapsuleEntry;
