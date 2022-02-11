const bcrypt = require("bcryptjs");

export const encrypt = async (password) => {
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
