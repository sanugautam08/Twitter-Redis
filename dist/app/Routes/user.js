"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userController = require("../controllers/userController");

const router = require("express").Router(); // Get user details


router.get("/", _userController.getUser);
var _default = router;
exports.default = _default;