"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _admin = _interopRequireDefault(require("../../Middleware/admin.middleware"));

var _auth = _interopRequireDefault(require("../../Middleware/auth.middleware"));

var _messageController = require("../controllers/messageController");

var _messageValidator = require("../validators/messageValidator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require("express");

const router = express.Router();
router.get("/", _auth.default, _messageController.getMessages);
router.post("/", _messageValidator.validateAddMessage, _messageController.addMessage);
router.delete("/:id", _auth.default, _messageController.deleteMessage);
var _default = router;
exports.default = _default;