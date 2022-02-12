"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encrypt = void 0;

const bcrypt = require("bcryptjs");

const encrypt = async password => {
  // Hashing
  try {
    const hash = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      resolve(hash);
    });
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(e);
    });
  }
};

exports.encrypt = encrypt;