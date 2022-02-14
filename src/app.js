const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
// import authenticate from "./Middleware/auth.middleware";
import client from "./utils/connectDb";

// app
const app = express();

// config
const PORT = process.env.PORT || 5001;

// routes
import Routes from "./app/Routes";
import auth from "./app/Routes/auth";
import authenticate from "./Middleware/auth.middleware";

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth/", auth);
app.use("/api/user/", authenticate, Routes.UserRoutes);
app.use("/api/tweets/", Routes.TweetRoutes);

// home
app.get("/", async (req, res) => {
  res.send("Twitter Clone API");
});

// listen
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
