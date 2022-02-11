"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAddMessage = void 0;

var _expressValidator = require("express-validator");

const validateAddMessage = [(0, _expressValidator.body)("email").trim().not().isEmpty().withMessage("email field is required").normalizeEmail().isEmail().withMessage("invalid email input").isLength({
  min: 4,
  max: 50
}).withMessage("invalid email length"), (0, _expressValidator.body)("subject").trim().escape().isLength({
  max: 200
}).withMessage("subject length exceeded"), (0, _expressValidator.body)("message").trim().isLength({
  max: 900
}).withMessage("message length exceeded")];
exports.validateAddMessage = validateAddMessage;