"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiResponse = _interopRequireDefault(require("../app/helpers/apiResponse"));

var _models = require("../app/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await _models.User.findById(req.user.id);

    if (user.role < 1) {
      next();
      return;
    }

    _apiResponse.default.unauthorizedResponse(res, "Access Denied: Not an admin");
  } catch (error) {
    _apiResponse.default.ErrorResponse(res, "Server error");
  }
};

var _default = verifyAdmin;
exports.default = _default;