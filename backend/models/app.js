// app.js
const mongoose = require('../../frontend/node_modules/mongoose');

const appSchema = new mongoose.Schema({
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
    ref: 'User',
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // add further requirements a normal password will have
  },

  role: {
    type: String,
  },
  
  mobile: {
    type: String,
  },
  location: {
    type: String,
  },
  pronouns: {
    type: String,
  },
  gender: {
    type: String,
  },
  bio: {
    type: String,
  },
  interests: {
    type: String,
  },


});

const App = mongoose.model('App', appSchema);

module.exports = App;
