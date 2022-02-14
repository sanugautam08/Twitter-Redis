import client from "../../utils/connectDb";
import apiResponse from "../helpers/apiResponse";

const getTweets = async (req, res) => {
  try {
    // fetch the elements of the central timeline array
    const timeline = await client.lRange("timeline", 0, -1);
    if (!timeline) {
      return apiResponse.successResponseWithData(res, "no tweets found!", []);
    }

    // get tweet data from each tweet id in the timeline array
    const tweets = await Promise.all(
      timeline.map(async (tweetId) => {
        const tweet = await client.hGetAll(`tweets:${tweetId}`);
        const owner = await client.hGetAll(`users:${tweet.owner}`);
        return { tweet: tweet.data, tweetId, owner: owner };
      })
    );

    return apiResponse.successResponseWithData(
      res,
      "operation successful",
      tweets
    );
  } catch (error) {
    return apiResponse.ErrorResponse(res, error);
  }
};

const getTweetsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    // fetch the elements of the central timeline array
    const activity = await client.lRange(`activity:${userId}`, 0, -1);

    if (!activity) {
      return apiResponse.successResponseWithData(res, "no tweets found!", []);
    }

    // get tweet data from each tweet id in the activity array
    const tweets = await Promise.all(
      activity.map(async (tweetId) => {
        const tweet = await client.hGetAll(`tweets:${tweetId}`);
        const owner = await client.hGetAll(`users:${tweet.owner}`);
        return { tweet: tweet.data, tweetId, owner: owner };
      })
    );

    return apiResponse.successResponseWithData(
      res,
      "operation successful",
      tweets
    );
  } catch (error) {
    return apiResponse.ErrorResponse(res, error);
  }
};

const postTweets = async (req, res) => {
  try {
    const { tweet } = req.body;
    const user = req.user.id;
    if (!tweet) {
      return apiResponse.validationErrorWithData(res, "Empty tweet", req.body);
    }

    const next_tweet_id = await client.incr("next_tweet_id");

    // store fields in redis
    const setTweet = await client.hSet(
      `tweets:${next_tweet_id}`,
      "data",
      tweet
    );

    // store fields in redis
    const setOwner = await client.hSet(
      `tweets:${next_tweet_id}`,
      "owner",
      user
    );

    if ((!setTweet, !setOwner)) {
      return apiResponse.ErrorResponse(res, "operation failed");
    }

    const pushToOwnerFeed = await client.lPush(
      `activity:${user}`,
      next_tweet_id
    );

    // push to central timeline
    const pushToTimeline = await client.lPush(`timeline`, next_tweet_id);
    const owner = await client.hGetAll(`users:${user}`);

    return apiResponse.successResponseWithData(res, "operation successful", {
      owner,
      tweet,
      tweetId: `${next_tweet_id}`,
    });
  } catch (error) {
    return apiResponse.ErrorResponse(res, error);
  }
};

export { getTweets, postTweets, getTweetsByUserId };
