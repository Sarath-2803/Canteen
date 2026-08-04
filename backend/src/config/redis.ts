import { createClient } from 'redis';

let client: ReturnType<typeof createClient> | null = null;

const connectRedis = async () => {
    if (client) {
        return client;
    }

    client = createClient({
        username: process.env.REDIS_USERNAME ,
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        }
    });

    client.on('error', (error) => {
        console.error('Redis Client Error:', error);
    });

    await client.connect();

    return client;
};

export default connectRedis;