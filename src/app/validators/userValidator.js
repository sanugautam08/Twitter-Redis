import { body } from "express-validator";

export const validateUserUpdate = [
  body("dateOfBirth")
    .not()
    .isEmpty()
    .withMessage("date is required")
    .isDate()
    .withMessage("not a valid date"),
  body("fullName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("full name is required")
    .isAscii()
    .withMessage("name containes invalid characters"),
  body("gender")
    .not()
    .isEmpty()
    .withMessage("gender field is required")
    .isAlpha()
    .withMessage("invalid gender"),
];

export const validateUserRegisteration = [
  body("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("field username is required")
    .isAlphanumeric()
    .withMessage("avoid special characters for username")
    .isLength({ min: 4, max: 20 })
    .withMessage("invalid length for username"),
  body("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("email can't be empty")
    .isEmail()
    .withMessage("invalid email address")
    .isLength({ min: 4, max: 50 })
    .withMessage("invalid length of email"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("field password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password must be 6 to 20 characters long"),
];

export const validateUserLogin = [
  body("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("field username is required"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("field password is required"),
];
