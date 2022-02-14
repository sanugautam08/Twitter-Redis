import authenticate from "../../Middleware/auth.middleware";
import {
  getTweets,
  getTweetsByUserId,
  postTweets,
} from "../controllers/tweetController";

const router = require("express").Router();

// Get user details
router.get("/", getTweets);
router.get("/activity", authenticate, getTweetsByUserId);
router.post("/", authenticate, postTweets);

export default router;
