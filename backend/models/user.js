// user.js
const mongoose = require('../../frontend/node_modules/mongoose');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    ref: 'App',
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  type: {
    type: String,
    enum: ['normal', 'moderator'],
    default: 'normal',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
