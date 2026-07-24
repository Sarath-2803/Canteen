import { createClient } from 'redis';

let client: ReturnType<typeof createClient> | null = null;

const connectRedis = async () => {
    if (client) {
        return client;
    }

    client = createClient({
        username: 'default',
        password: 'wi2fmQGZ2S6779oBxco9H8DJ7IdUFPmT',
        socket: {
            host: 'meeting-lunchroom-delightful-70019.db.redis.io',
            port: 17799
        }
    });

    client.on('error', (error) => {
        console.error('Redis Client Error:', error);
    });

    await client.connect();

    return client;
};

export default connectRedis;