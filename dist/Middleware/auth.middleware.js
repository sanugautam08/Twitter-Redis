"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiResponse = _interopRequireDefault(require("../app/helpers/apiResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    /* Verify token and add user as payload to req object */
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if (!token) {
      return _apiResponse.default.unauthorizedResponse(res, "Unauthorized request");
    }

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifiedUser) {
      return _apiResponse.default.unauthorizedResponse(res, "Unauthorized request");
    }

    req.user = verifiedUser;
    next();
  } catch (e) {
    return _apiResponse.default.unauthorizedResponse(res, "Unauthorized request");
  }
};

var _default = authenticate;
exports.default = _default;