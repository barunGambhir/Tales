// image.js
const mongoose = require('../../frontend/node_modules/mongoose');

const imageSchema = new mongoose.Schema({
  // post: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Post',
  // },
  image_id: {
    type: String,
  },
  image_url: {
    type: String,
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
