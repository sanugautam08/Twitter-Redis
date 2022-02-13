import { validationResult } from "express-validator";
import apiResponse from "../helpers/apiResponse";
import { User } from "../models";

const getTweets = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return apiResponse.notFoundResponse(res, "user not found!");
    }
    return apiResponse.successResponseWithData(
      res,
      "operation successful",
      user
    );
  } catch (error) {
    return apiResponse.ErrorResponse(res, error);
  }
};

const postTweets = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return apiResponse.notFoundResponse(res, "user not found!");
    }
    return apiResponse.successResponseWithData(
      res,
      "operation successful",
      user
    );
  } catch (error) {
    return apiResponse.ErrorResponse(res, error);
  }
};

export { getTweets, postTweets };
