const config = {};

config.redisStore = {
  url: process.env.REDIS_STORE_HOST || 'localhost',
  port: process.env.REDIS_STORE_PORT || '6379',
  secret: process.env.REDIS_STORE_SECRET || 'session'
};

module.exports = config;
