import { body } from "express-validator";

export const validateAddMessage = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email field is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("invalid email input")
    .isLength({ min: 4, max: 50 })
    .withMessage("invalid email length"),
  body("subject")
    .trim()
    .escape()
    .isLength({ max: 200 })
    .withMessage("subject length exceeded"),
  body("message")
    .trim()
    .isLength({ max: 900 })
    .withMessage("message length exceeded"),
];
