"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = void 0;

var _expressValidator = require("express-validator");

var _apiResponse = _interopRequireDefault(require("../helpers/apiResponse"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUser = async (req, res) => {
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

exports.getUser = getUser;