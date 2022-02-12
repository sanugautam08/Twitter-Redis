"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const redis = require("redis");

const client = redis.createClient({
  socket: {
    port: 6379
  }
});
client.connect();
client.on("connect", () => {
  console.log("connected");
});
var _default = client;
exports.default = _default;