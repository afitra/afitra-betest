// const RedisClient = require("redis").createClient;

// const client = RedisClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
// async function connect() {
//   await client.connect();
//   client.on("error", (err) => console.log("Redis Client Error", err));
// }
// connect();
const createClient = require("redis").createClient;

const client = createClient({
  url: process.env.REDIS_URI,
});
async function connect() {
  client.on("error", (err) => console.log("Redis Client Error", err));
  console.log("redis ++++++++");
  await client.connect();
}
connect();
/**
 * get redis cache
 * @param {string} redis_key
 */

module.exports = {
  async getRedisData(redis_key) {
    try {
      return await client.get(process.env.REDIS_KEY);
    } catch (error) {
      return null;
    }
  },
  async setRedisData(redis_key, redis_value) {
    try {
      return await client.set(redis_key, redis_value);
    } catch (error) {
      return null;
    }
  },
  async destroyRedisData(redis_key) {
    try {
      return await client.del(redis_key);
    } catch (error) {
      return null;
    }
  },
};
