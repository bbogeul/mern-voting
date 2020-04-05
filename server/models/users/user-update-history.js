const mongoose = require('mongoose');

const userUpdateHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    // default: Date.now()
    default: new Date(),
  },
});

module.exports = mongoose.model('UserUpdateHistory', userUpdateHistorySchema);
