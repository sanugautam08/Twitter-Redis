const redis = require("redis");
const client = redis.createClient({ socket: { port: 6379 } });

client.connect();

client.on("connect", () => {
  console.log("connected");
});

export default client;
