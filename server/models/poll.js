const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  options: String,
  votes: {
    type: Number,
    default: false,
  },
});

const pollSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  question: String,
  options: [optionSchema],
  voted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  created: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Poll', pollSchema);
