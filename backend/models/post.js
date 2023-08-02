// post.js
const mongoose = require('../../frontend/node_modules/mongoose');

const postSchema = new mongoose.Schema({
  email: {
    type: String,
    ref: 'User',
  },
  title: {
    type: String,
  },

  likes: {
    type: Number,
    default: 0,
  },
  generatedDataForVideo: [
    {
      prompt: {
        type: String,
      },
      paragraph: {
        type: String,
      },
      image_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
      },
      binaryFile: {
        type: Buffer,
      },
    },
  ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
