const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
  //   원래 Date.now()하고 싶긴 하는데... 일단은 new Date() 로
  created: {
    type: Date,
    // default: Date.now()
    default: new Date(),
  },
  polls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// let's try not to use the arrow function for this..
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, process.env.BCRYPT);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

// check password
userSchema.methods.comparePassword = async function(password, next) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    next(err);
  }
};

module.exports = mongoose.model('User', userSchema);
