import { body } from "express-validator";

export const validateAddNewsletter = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email field is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("invalid email input"),
];
