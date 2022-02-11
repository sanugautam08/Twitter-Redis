"use strict";

const mongoose = require("mongoose");

const newsletter = mongoose.Schema({
  clientId: {
    type: String,
    required: true
  },
  email: String
});
module.exports = mongoose.model("Newsletter", newsletter);