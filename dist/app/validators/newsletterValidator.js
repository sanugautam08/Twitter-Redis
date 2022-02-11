"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAddNewsletter = void 0;

var _expressValidator = require("express-validator");

const validateAddNewsletter = [(0, _expressValidator.body)("email").trim().not().isEmpty().withMessage("email field is required").normalizeEmail().isEmail().withMessage("invalid email input")];
exports.validateAddNewsletter = validateAddNewsletter;