"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connectDb = _interopRequireDefault(require("../../utils/connectDb"));

var _apiResponse = _interopRequireDefault(require("../helpers/apiResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require("express");

require("dotenv").config();

const router = express.Router();

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
router.post("/register", async (req, res) => {
  try {
    // destructure the req body
    const {
      username,
      email,
      fullName,
      password
    } = req.body; // check for empty fields

    if (!username || !email || !password || !fullName) {
      return _apiResponse.default.validationErrorWithData(res, "empty fields", req.body);
    } // check if user already exists


    const already_exists = await _connectDb.default.hGet(`users`, `${username}`);

    if (already_exists) {
      return _apiResponse.default.validationErrorWithData(res, "username already exists", req.body);
    } // increase "next_user_id"


    const next_user_id = await _connectDb.default.incr("next_user_id"); // store fields in redis

    const setUsername = await _connectDb.default.hSet(`users`, `${username}`, next_user_id);
    const setEmail = await _connectDb.default.hSet(`users:${next_user_id}`, "email", email);
    const setPassword = await _connectDb.default.hSet(`users:${next_user_id}`, "password", password);
    const setFullName = await _connectDb.default.hSet(`users:${next_user_id}`, "fullName", fullName); // logs

    console.log("response", next_user_id, setUsername, setEmail, setPassword, setFullName); // check if some error has occured

    if (!setUsername || !setPassword || !setEmail || !setFullName) {
      return _apiResponse.default.ErrorResponse(res, "server error");
    } // if no error, send JWT Token


    if (setUsername && setPassword && setEmail && setFullName) {
      // Send JWT
      const token = jwt.sign({
        id: next_user_id,
        username: username
      }, JWT_SECRET, {
        expiresIn: "60h"
      });
      return _apiResponse.default.successResponseWithData(res, "Registered", {
        username: username,
        token: token
      });
    }
  } catch (error) {
    console.log(error);
    return _apiResponse.default.ErrorResponse(res, "error");
  }
});
router.post("/login", async (req, res) => {
  try {
    // destructure the req body
    const {
      username,
      password
    } = req.body; // check for empty fields

    if (!username || !password) {
      return _apiResponse.default.validationErrorWithData(res, "empty fields", req.body);
    } // check if user already exists


    const already_exists = await _connectDb.default.hGet(`users`, `${username}`);

    if (!already_exists) {
      return _apiResponse.default.validationErrorWithData(res, "user not found", req.body);
    } // find the user id


    const userId = await _connectDb.default.hGet(`users`, `${username}`);
    const passwordFromDb = await _connectDb.default.hGet(`users:${userId}`, "password");

    if (!(password === passwordFromDb)) {
      _apiResponse.default.unauthorizedResponse(res, "wrong password");
    } // Send JWT


    const token = jwt.sign({
      id: userId,
      username: username
    }, JWT_SECRET, {
      expiresIn: "60h"
    });
    return _apiResponse.default.successResponseWithData(res, "Logged In", {
      username: username,
      token: token
    });
  } catch (error) {
    console.log(error);
    return _apiResponse.default.ErrorResponse(res, "error");
  }
});
var _default = router;
exports.default = _default;