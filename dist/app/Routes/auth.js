"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

var _hash = require("../../utils/hash");

var _apiResponse = _interopRequireDefault(require("../helpers/apiResponse"));

var _models = require("../models");

var _userValidator = require("../validators/userValidator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require("express");

require("dotenv").config();

const router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs"); //


const JWT_SECRET = process.env.JWT_SECRET;
router.post("/register", _userValidator.validateUserRegisteration, async (req, res) => {
  try {
    const errors = (0, _expressValidator.validationResult)(req).array();

    if (errors.length > 0) {
      return _apiResponse.default.validationErrorWithData(res, errors[0].msg, errors[0].value);
    }

    const {
      username,
      email,
      password
    } = req.body;
    const userByUsername = await _models.User.findOne({
      username
    });
    const userByEmail = await _models.User.findOne({
      email
    });

    if (userByUsername) {
      return _apiResponse.default.unauthorizedResponse(res, "Username already exists");
    }

    if (userByEmail) {
      return _apiResponse.default.unauthorizedResponse(res, "Email already exists");
    } // create a user document from User Model


    const hashedPassword = await (0, _hash.encrypt)(password);
    const newUser = new _models.User({
      username: username.toLowerCase(),
      email: email,
      password: hashedPassword
    }); // save the user document to db

    const savedUser = await newUser.save();

    if (savedUser) {
      // Send JWT
      const token = jwt.sign({
        id: savedUser._id,
        username: savedUser.username,
        role: savedUser.role
      }, JWT_SECRET, {
        expiresIn: "60h"
      });
      return _apiResponse.default.successResponseWithData(res, "Registered", {
        username: savedUser.username,
        role: savedUser.role,
        token: token
      });
    }
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, "error");
  }
});
router.post("/login", _userValidator.validateUserLogin, async (req, res) => {
  try {
    const errors = (0, _expressValidator.validationResult)(req).array();

    if (errors.length > 0) {
      return _apiResponse.default.validationErrorWithData(res, errors[0].msg, errors[0].value);
    }

    let {
      username,
      password
    } = req.body;
    let user = await _models.User.findOne({
      username
    }).lean();

    if (!user) {
      user = await _models.User.findOne({
        email: username
      }).lean();

      if (!user) {
        return _apiResponse.default.notFoundResponse(res, "Invalid Username/Password");
      }
    }

    try {
      bcrypt.compare(password, user.password, (error, response) => {
        if (error) {
          return _apiResponse.default.ErrorResponse(res, error);
        }

        if (response) {
          // Send JWT
          const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role
          }, JWT_SECRET, {
            expiresIn: "60h"
          });
          return _apiResponse.default.successResponseWithData(res, "login successful", {
            username: user.username,
            role: user.role,
            token
          });
        } else {
          return _apiResponse.default.notFoundResponse(res, "wrong password");
        }
      });
    } catch (error) {
      return _apiResponse.default.ErrorResponse(res, "error");
    }
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, "error");
  }
});
var _default = router;
exports.default = _default;