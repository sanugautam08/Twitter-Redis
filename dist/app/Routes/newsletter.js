"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _admin = _interopRequireDefault(require("../../Middleware/admin.middleware"));

var _auth = _interopRequireDefault(require("../../Middleware/auth.middleware"));

var _newsletterController = require("../controllers/newsletterController");

var _newsletterValidator = require("../validators/newsletterValidator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require("express");

const router = express.Router();
router.get("/", _auth.default, _admin.default, _newsletterController.getSubscriptions);
router.post("/", _newsletterValidator.validateAddNewsletter, _newsletterController.addSubscription);
router.delete("/:id", _auth.default, _admin.default, _newsletterController.deleteSubscription);
var _default = router;
exports.default = _default;