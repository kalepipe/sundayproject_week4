const mongoose = require('mongoose');

const guestPostSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  content: { type: String, required: true },
  updatedDate: { type: Date, default: Date.now },
  updated: { type: Boolean, default: false }
});

const GuestPost = mongoose.model('Guestpost', guestPostSchema);

module.exports = GuestPost;
