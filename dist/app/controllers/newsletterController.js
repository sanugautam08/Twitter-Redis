"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSubscriptions = exports.deleteSubscription = exports.addSubscription = void 0;

var _expressValidator = require("express-validator");

var _apiResponse = _interopRequireDefault(require("../helpers/apiResponse"));

var _Newsletter = _interopRequireDefault(require("../models/Newsletter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSubscriptions = async (req, res) => {
  try {
    const clientid = req.headers["x-clientid"];
    if (!clientid) return _apiResponse.default.unauthorizedResponse(res, "not a valid client");
    const newsletters = await _Newsletter.default.find({
      clientId: clientid
    }).limit(1000);

    if (newsletters.length > 0) {
      return _apiResponse.default.successResponseWithData(res, "Operation Successful", newsletters);
    }

    return _apiResponse.default.successResponseWithData(res, "Operation Successful", []);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.getSubscriptions = getSubscriptions;

const addSubscription = async (req, res) => {
  try {
    const errors = (0, _expressValidator.validationResult)(req).array();

    if (errors.length > 0) {
      return _apiResponse.default.validationErrorWithData(res, errors[0].msg, errors[0].value);
    }

    const prevNewsletter = await _Newsletter.default.find({
      email: req.body.email
    });

    if (prevNewsletter.length > 0) {
      return _apiResponse.default.validationErrorWithData(res, "Already subscribed!", req.body.email);
    }

    const newsletter = new _Newsletter.default({
      clientId: req.headers["x-clientid"],
      email: req.body.email
    });
    const subscription = await newsletter.save();

    if (subscription) {
      return _apiResponse.default.successResponseWithData(res, "Operation Successful", subscription);
    }

    return _apiResponse.default.successResponseWithData(res, "Subscription Added", []);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.addSubscription = addSubscription;

const deleteSubscription = async (req, res) => {
  try {
    const deletedNewsletter = await _Newsletter.default.findByIdAndDelete(req.params.id);
    return _apiResponse.default.successResponseWithData(res, "Unsubscribed", deletedNewsletter);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.deleteSubscription = deleteSubscription;