"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = void 0;

var _connectDb = _interopRequireDefault(require("../../utils/connectDb"));

var _apiResponse = _interopRequireDefault(require("../helpers/apiResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await _connectDb.default.hGetAll(`users:${userId}`);
    console.log(user);

    if (!user) {
      return _apiResponse.default.notFoundResponse(res, "user not found!");
    }

    return _apiResponse.default.successResponseWithData(res, "operation successful", user);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.getUser = getUser;