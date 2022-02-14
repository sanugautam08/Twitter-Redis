"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("../../Middleware/auth.middleware"));

var _tweetController = require("../controllers/tweetController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = require("express").Router(); // Get user details


router.get("/", _tweetController.getTweets);
router.get("/activity", _auth.default, _tweetController.getTweetsByUserId);
router.post("/", _auth.default, _tweetController.postTweets);
var _default = router;
exports.default = _default;