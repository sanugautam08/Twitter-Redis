"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("./user"));

var _newsletter = _interopRequireDefault(require("./newsletter"));

var _message = _interopRequireDefault(require("./message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  UserRoutes: _user.default,
  NewsletterRoutes: _newsletter.default,
  MessageRoutes: _message.default
};
exports.default = _default;