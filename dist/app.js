"use strict";

var _connectDb = _interopRequireDefault(require("./utils/connectDb"));

var _auth = _interopRequireDefault(require("./app/Routes/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require("express");

require("dotenv").config();

const bodyParser = require("body-parser");

const cors = require("cors");

const redis = require("redis"); // import authenticate from "./Middleware/auth.middleware";


// app
const app = express(); // config

const PORT = process.env.PORT || 5001; // routes
// import Routes from "./app/Routes";

// import verifyAdmin from "./Middleware/admin.middleware";
// middlewares
app.use(cors());
app.use(bodyParser.json()); // app.use(morgan("dev"));

app.use("/api/auth/", _auth.default); // app.use("/api/user/", authenticate, Routes.UserRoutes);
// home

app.get("/", async (req, res) => {
  let settingKey = await _connectDb.default.set("key", "value");
  let key = await _connectDb.default.get("key");
  console.log(key);
  res.send("Twitter Clone API");
}); // listen

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});