"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserUpdate = exports.validateUserRegisteration = exports.validateUserLogin = void 0;

var _expressValidator = require("express-validator");

const validateUserUpdate = [(0, _expressValidator.body)("dateOfBirth").not().isEmpty().withMessage("date is required").isDate().withMessage("not a valid date"), (0, _expressValidator.body)("fullName").trim().not().isEmpty().withMessage("full name is required").isAscii().withMessage("name containes invalid characters"), (0, _expressValidator.body)("gender").not().isEmpty().withMessage("gender field is required").isAlpha().withMessage("invalid gender")];
exports.validateUserUpdate = validateUserUpdate;
const validateUserRegisteration = [(0, _expressValidator.body)("username").trim().not().isEmpty().withMessage("field username is required").isAlphanumeric().withMessage("avoid special characters for username").isLength({
  min: 4,
  max: 20
}).withMessage("invalid length for username"), (0, _expressValidator.body)("email").trim().normalizeEmail().not().isEmpty().withMessage("email can't be empty").isEmail().withMessage("invalid email address").isLength({
  min: 4,
  max: 50
}).withMessage("invalid length of email"), (0, _expressValidator.body)("password").trim().not().isEmpty().withMessage("field password is required").isLength({
  min: 6,
  max: 20
}).withMessage("password must be 6 to 20 characters long")];
exports.validateUserRegisteration = validateUserRegisteration;
const validateUserLogin = [(0, _expressValidator.body)("username").trim().not().isEmpty().withMessage("field username is required"), (0, _expressValidator.body)("password").trim().not().isEmpty().withMessage("field password is required")];
exports.validateUserLogin = validateUserLogin;