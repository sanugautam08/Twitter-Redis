"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postTweets = exports.getTweets = void 0;

var _expressValidator = require("express-validator");

var _apiResponse = _interopRequireDefault(require("../helpers/apiResponse"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTweets = async (req, res) => {
  try {
    const user = await _models.User.findById(req.user.id);

    if (!user) {
      return _apiResponse.default.notFoundResponse(res, "user not found!");
    }

    return _apiResponse.default.successResponseWithData(res, "operation successful", user);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.getTweets = getTweets;

const postTweets = async (req, res) => {
  try {
    const user = await _models.User.findById(req.user.id);

    if (!user) {
      return _apiResponse.default.notFoundResponse(res, "user not found!");
    }

    return _apiResponse.default.successResponseWithData(res, "operation successful", user);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.postTweets = postTweets;