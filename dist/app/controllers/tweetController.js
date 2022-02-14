"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postTweets = exports.getTweetsByUserId = exports.getTweets = void 0;

var _connectDb = _interopRequireDefault(require("../../utils/connectDb"));

var _apiResponse = _interopRequireDefault(require("../helpers/apiResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTweets = async (req, res) => {
  try {
    // fetch the elements of the central timeline array
    const timeline = await _connectDb.default.lRange("timeline", 0, -1);

    if (!timeline) {
      return _apiResponse.default.successResponseWithData(res, "no tweets found!", []);
    } // get tweet data from each tweet id in the timeline array


    const tweets = await Promise.all(timeline.map(async tweetId => {
      const tweet = await _connectDb.default.hGetAll(`tweets:${tweetId}`);
      const owner = await _connectDb.default.hGetAll(`users:${tweet.owner}`);
      return {
        tweet: tweet.data,
        tweetId,
        owner: owner
      };
    }));
    return _apiResponse.default.successResponseWithData(res, "operation successful", tweets);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.getTweets = getTweets;

const getTweetsByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // fetch the elements of the central timeline array

    const activity = await _connectDb.default.lRange(`activity:${userId}`, 0, -1);

    if (!activity) {
      return _apiResponse.default.successResponseWithData(res, "no tweets found!", []);
    } // get tweet data from each tweet id in the activity array


    const tweets = await Promise.all(activity.map(async tweetId => {
      const tweet = await _connectDb.default.hGetAll(`tweets:${tweetId}`);
      const owner = await _connectDb.default.hGetAll(`users:${tweet.owner}`);
      return {
        tweet: tweet.data,
        tweetId,
        owner: owner
      };
    }));
    return _apiResponse.default.successResponseWithData(res, "operation successful", tweets);
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.getTweetsByUserId = getTweetsByUserId;

const postTweets = async (req, res) => {
  try {
    const {
      tweet
    } = req.body;
    const user = req.user.id;

    if (!tweet) {
      return _apiResponse.default.validationErrorWithData(res, "Empty tweet", req.body);
    }

    const next_tweet_id = await _connectDb.default.incr("next_tweet_id"); // store fields in redis

    const setTweet = await _connectDb.default.hSet(`tweets:${next_tweet_id}`, "data", tweet); // store fields in redis

    const setOwner = await _connectDb.default.hSet(`tweets:${next_tweet_id}`, "owner", user);

    if (!setTweet, !setOwner) {
      return _apiResponse.default.ErrorResponse(res, "operation failed");
    }

    const pushToOwnerFeed = await _connectDb.default.lPush(`activity:${user}`, next_tweet_id); // push to central timeline

    const pushToTimeline = await _connectDb.default.lPush(`timeline`, next_tweet_id);
    const owner = await _connectDb.default.hGetAll(`users:${user}`);
    return _apiResponse.default.successResponseWithData(res, "operation successful", {
      owner,
      tweet,
      tweetId: `${next_tweet_id}`
    });
  } catch (error) {
    return _apiResponse.default.ErrorResponse(res, error);
  }
};

exports.postTweets = postTweets;