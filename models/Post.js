const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,

  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },
  postImage: {
    date: Buffer,
    contentType: String
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date
  },
  updated: {
    type: Boolean,
    default: false
  }
});

// Create Model & Export
Post = mongoose.model('Post', postSchema);

module.exports = Post;
