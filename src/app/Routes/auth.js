const express = require("express");
require("dotenv").config();
const router = express.Router();
import client from "../../utils/connectDb";
import apiResponse from "../helpers/apiResponse";
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    // destructure the req body
    const { username, email, fullName, password } = req.body;

    // check for empty fields
    if (!username || !email || !password || !fullName) {
      return apiResponse.validationErrorWithData(res, "empty fields", req.body);
    }

    // check if user already exists
    const already_exists = await client.hGet(`users`, `${username}`);
    if (already_exists) {
      return apiResponse.validationErrorWithData(
        res,
        "username already exists",
        req.body
      );
    }

    // increase "next_user_id"
    const next_user_id = await client.incr("next_user_id");

    // store fields in redis
    const setUsername = await client.hSet(`users`, `${username}`, next_user_id);
    const setEmail = await client.hSet(`users:${next_user_id}`, "email", email);
    const setUsernameInUserTable = await client.hSet(
      `users:${next_user_id}`,
      "username",
      username
    );
    const setPassword = await client.hSet(
      `users:${next_user_id}`,
      "password",
      password
    );
    const setFullName = await client.hSet(
      `users:${next_user_id}`,
      "fullName",
      fullName
    );

    // check if some error has occured
    if (!setUsername || !setPassword || !setEmail || !setFullName) {
      return apiResponse.ErrorResponse(res, "server error");
    }

    // if no error, send JWT Token
    if (setUsername && setPassword && setEmail && setFullName) {
      // Send JWT
      const token = jwt.sign(
        {
          id: next_user_id,
          username: username,
        },
        JWT_SECRET,
        {
          expiresIn: "60h",
        }
      );
      return apiResponse.successResponseWithData(res, "Registered", {
        username: username,
        token: token,
      });
    }
  } catch (error) {
    return apiResponse.ErrorResponse(res, "error");
  }
});

router.post("/login", async (req, res) => {
  try {
    // destructure the req body
    const { username, password } = req.body;

    // check for empty fields
    if (!username || !password) {
      return apiResponse.validationErrorWithData(res, "empty fields", req.body);
    }

    // check if user already exists
    const already_exists = await client.hGet(`users`, `${username}`);
    if (!already_exists) {
      return apiResponse.validationErrorWithData(
        res,
        "user not found",
        req.body
      );
    }

    // find the user id
    const userId = await client.hGet(`users`, `${username}`);
    const passwordFromDb = await client.hGet(`users:${userId}`, "password");
    if (!(password === passwordFromDb)) {
      apiResponse.unauthorizedResponse(res, "wrong password");
    }

    // Send JWT
    const token = jwt.sign(
      {
        id: userId,
        username: username,
      },
      JWT_SECRET,
      {
        expiresIn: "60h",
      }
    );

    return apiResponse.successResponseWithData(res, "Logged In", {
      username: username,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return apiResponse.ErrorResponse(res, "error");
  }
});

export default router;
