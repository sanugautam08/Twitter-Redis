"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userController = require("../controllers/userController");

var _userValidator = require("../validators/userValidator");

const router = require("express").Router(); // Get user details


router.get("/", _userController.getUser); // Update user details

router.patch("/", _userValidator.validateUserUpdate, _userController.updateUser); // Update user details

router.delete("/", _userController.deleteUser);
var _default = router;
exports.default = _default;