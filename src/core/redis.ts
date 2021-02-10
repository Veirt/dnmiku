import session from "express-session";
import { createClient } from "redis";
import connectRedis from "connect-redis";

export const RedisStore = connectRedis(session);
export const redisClient = createClient({
  port: 6379,
  host: process.env.REDIS_HOST || "localhost",
});
