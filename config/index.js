const config = {};

config.redisStore = {
  url: process.env.REDIS_STORE_URI || 6565,
  secret: process.env.REDIS_STORE_SECRET || 6565
};

module.exports = config;
