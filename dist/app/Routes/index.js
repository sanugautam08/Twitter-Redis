"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tweet = _interopRequireDefault(require("./tweet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import UserRoutes from "./user";
var _default = {
  // UserRoutes,
  TweetRoutes: _tweet.default
};
exports.default = _default;