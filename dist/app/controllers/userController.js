"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = void 0;

var _expressValidator = require("express-validator");

var _apiResponse = _interopRequireDefault(require("../helpers/apiResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { User } from "../models";
const getUser = async (req, res) => {
  try {
    // const user = await User.findById(req.user.id);
    // if (!user) {
    // return apiResponse.notFoundResponse(res, "user not found!");
    // }
    return _apiResponse.default.successResponseWithData(res, "operation successful", req);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.getUser = getUser;