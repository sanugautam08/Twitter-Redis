"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessages = exports.deleteMessage = exports.addMessage = void 0;

var _Message = _interopRequireDefault(require("../models/Message"));

var _apiResponse = _interopRequireDefault(require("../helpers/apiResponse"));

var _expressValidator = require("express-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMessages = async (req, res) => {
  try {
    const clientid = req.headers["x-clientid"];
    if (!clientid) return _apiResponse.default.unauthorizedResponse(res, "not a valid client");
    const messages = await _Message.default.find({
      clientId: clientid
    }).limit(500);

    if (messages.length > 0) {
      return _apiResponse.default.successResponseWithData(res, "Operation Success", messages);
    }

    return _apiResponse.default.successResponseWithData(res, "Operation Success", []);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.getMessages = getMessages;

const addMessage = async (req, res) => {
  try {
    const errors = (0, _expressValidator.validationResult)(req).array();

    if (errors.length > 0) {
      return _apiResponse.default.validationErrorWithData(res, errors[0].msg, errors[0].value);
    }

    const newMsg = new _Message.default({
      clientId: req.headers["x-clientid"],
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message
    });
    const savedMsg = await newMsg.save();
    return _apiResponse.default.successResponseWithData(res, "Operation Successful", savedMsg);
  } catch (error) {
    return _apiResponse.default.successResponseWithData(res, error);
  }
};

exports.addMessage = addMessage;

const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await _Message.default.findByIdAndDelete(req.params.id);
    return _apiResponse.default.successResponseWithData(res, "Deletion Successful", deletedMessage);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.deleteMessage = deleteMessage;