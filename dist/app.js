"use strict";

var _connectDb = _interopRequireDefault(require("./utils/connectDb"));

var _Routes = _interopRequireDefault(require("./app/Routes"));

var _auth = _interopRequireDefault(require("./app/Routes/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require("express");

require("dotenv").config();

const bodyParser = require("body-parser");

const cors = require("cors"); // import authenticate from "./Middleware/auth.middleware";


// app
const app = express(); // config

const PORT = process.env.PORT || 5001; // routes

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth/", _auth.default); // app.use("/api/user/", authenticate, Routes.UserRoutes);

app.use("/api/tweets/", _Routes.default.TweetRoutes); // home

app.get("/", async (req, res) => {
  res.send("Twitter Clone API");
}); // listen

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});