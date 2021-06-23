const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  address_line_1: {
    type: String,
    min: 6,
    max: 255,
  },
  address_line_2: {
    type: String,
    min: 6,
    max: 255,
  },
  bio: {
    type: String,
    min: 6,
    max: 255,
  },
  cash: {
    type: Number,
    required: true,
    default: 0
  },
  city: {
    type: String,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  firstName: {
    type: String,
    min: 6,
    max: 255,
  },
  lastName: {
    type: String,
    min: 6,
    max: 255,
  },
  moneyType: {
    type: String,
    required: true,
    default: "$",
    min: 1,
    max: 1,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  state: {
    type: String,
    min: 6,
    max: 255,
  },
  user_image: {
    type: String
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  zip_code: {
    type: String,
    min: 5,
    max: 10,
  },
  created_Date: {
    type: Date,
    required: true,
    default: Date.now
  },
  modified_Date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { collection: 'user' })

module.exports = mongoose.model('User', userSchema);
