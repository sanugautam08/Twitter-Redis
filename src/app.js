const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
// const morgan = require("morgan");
import authenticate from "./Middleware/auth.middleware";

// app
const app = express();

// config
const PORT = process.env.PORT || 5001;

// routes
// import Routes from "./app/Routes";
// import auth from "./app/Routes/auth";
// import verifyAdmin from "./Middleware/admin.middleware";

// middlewares
app.use(cors());
app.use(bodyParser.json());
// app.use(morgan("dev"));
app.use("/api/auth/", auth);
// app.use("/api/user/", authenticate, Routes.UserRoutes);

// home
app.get("/", (req, res) => {
  res.send("Portfolio backend API");
});

// listen
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
