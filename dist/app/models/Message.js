"use strict";

const mongoose = require("mongoose");

const message = mongoose.Schema({
  clientId: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    trim: true
  }
});
module.exports = mongoose.model("Message", message);