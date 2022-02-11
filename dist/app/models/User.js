"use strict";

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String
  },
  contactNumber: {
    type: String
  },
  userImage: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: () => Date.now()
  },
  role: {
    type: Number,
    default: 0
  },
  address: String,
  city: String,
  state: String,
  zip: String
}, {
  timestamps: true
});
module.exports = mongoose.model("User", UserSchema);