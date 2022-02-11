"use strict";

let express = require("express");

let path = require("path");

let session = require("express-session");

let cookieParser = require("cookie-parser");

let bodyParser = require("body-parser"); // let auth = require("./lib/middleware/auth");
// let user = require("./lib/middleware/user");
// let User = require("./lib/model/user");
// let routes = require("./routes/index");
// let signup = require("./routes/signup");


let login = require("./routes/login"); // let logout = require("./routes/logout");
// let post = require("./routes/post");
// let profile = require("./routes/profile");
// let suggestions = require("./routes/suggestions");
// let follow = require("./routes/follow");
// let settings = require("./routes/settings");


let app = express();
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "topsecret"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use("/api", auth(User.authenticate, "twitter"));
app.use(user()); // app.use("/signup", signup);

app.use("/login", login); // app.use("/logout", logout);
// app.use("/post", post);
// app.use("/suggestions", suggestions);
// app.use("/follow", follow);
// app.use("/settings", settings);
// app.use("/", profile);
// app.use("/", routes);