"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("./user"));

var _tweet = _interopRequireDefault(require("./tweet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  UserRoutes: _user.default,
  TweetRoutes: _tweet.default
};
exports.default = _default;