"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.getUser = exports.deleteUser = void 0;

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

const deleteUser = async (req, res) => {
  try {
    const user = await _models.User.findByIdAndDelete(req.user.id);
    return _apiResponse.default.successResponseWithData(res, "Deletion successful", user);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.deleteUser = deleteUser;

const updateUser = async (req, res) => {
  try {
    const errors = (0, _expressValidator.validationResult)(req).array();

    if (errors.length > 0) {
      return _apiResponse.default.validationErrorWithData(res, errors[0].msg, errors[0].value);
    }

    const update = {
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      city: req.body.city,
      contactNumber: req.body.contactNumber
    };
    const user = await _models.User.findByIdAndUpdate(req.user.id, update, {
      new: true
    });

    if (!user) {
      return _apiResponse.default.notFoundResponse(res, "failed to update. try again!");
    }

    return _apiResponse.default.successResponseWithData(res, "user updated", user);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.updateUser = updateUser;