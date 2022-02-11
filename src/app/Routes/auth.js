const express = require("express");
require("dotenv").config();
const router = express.Router();
import { validationResult } from "express-validator";
import { encrypt } from "../../utils/hash";
import apiResponse from "../helpers/apiResponse";
import { User } from "../models";
import {
  validateUserLogin,
  validateUserRegisteration,
} from "../validators/userValidator";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", validateUserRegisteration, async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      return apiResponse.validationErrorWithData(
        res,
        errors[0].msg,
        errors[0].value
      );
    }
    const { username, email, password } = req.body;

    const userByUsername = await User.findOne({ username });
    const userByEmail = await User.findOne({ email });

    if (userByUsername) {
      return apiResponse.unauthorizedResponse(res, "Username already exists");
    }

    if (userByEmail) {
      return apiResponse.unauthorizedResponse(res, "Email already exists");
    }

    // create a user document from User Model
    const hashedPassword = await encrypt(password);
    const newUser = new User({
      username: username.toLowerCase(),
      email: email,
      password: hashedPassword,
    });

    // save the user document to db
    const savedUser = await newUser.save();
    if (savedUser) {
      // Send JWT
      const token = jwt.sign(
        {
          id: savedUser._id,
          username: savedUser.username,
          role: savedUser.role,
        },
        JWT_SECRET,
        {
          expiresIn: "60h",
        }
      );
      return apiResponse.successResponseWithData(res, "Registered", {
        username: savedUser.username,
        role: savedUser.role,
        token: token,
      });
    }
  } catch (error) {
    return apiResponse.ErrorResponse(res, "error");
  }
});

router.post("/login", validateUserLogin, async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      return apiResponse.validationErrorWithData(
        res,
        errors[0].msg,
        errors[0].value
      );
    }
    let { username, password } = req.body;
    let user = await User.findOne({ username }).lean();

    if (!user) {
      user = await User.findOne({ email: username }).lean();
      if (!user) {
        return apiResponse.notFoundResponse(res, "Invalid Username/Password");
      }
    }

    try {
      bcrypt.compare(password, user.password, (error, response) => {
        if (error) {
          return apiResponse.ErrorResponse(res, error);
        }
        if (response) {
          // Send JWT
          const token = jwt.sign(
            {
              id: user._id,
              username: user.username,
              role: user.role,
            },
            JWT_SECRET,
            {
              expiresIn: "60h",
            }
          );
          return apiResponse.successResponseWithData(res, "login successful", {
            username: user.username,
            role: user.role,
            token,
          });
        } else {
          return apiResponse.notFoundResponse(res, "wrong password");
        }
      });
    } catch (error) {
      return apiResponse.ErrorResponse(res, "error");
    }
  } catch (error) {
    return apiResponse.ErrorResponse(res, "error");
  }
});

export default router;
