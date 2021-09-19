import redis from "redis";

const client = redis.createClient();

client.on("error", err => {
    console.error(`Error when connecting to redis: ${err}`);
});

export default client;
