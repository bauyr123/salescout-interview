// Write a script that:
// 1. Connects to Redis.
// 2. Saves the keys with their values.
// 3. Reads and outputs values for a given key.

// Use redis library
import { createClient } from 'redis';
async function manageRedis(): Promise<void> {
    const client = createClient({ url: 'redis://localhost:6379' });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    try {
        await client.set('key1', 'value1');
        await client.set('key2', 'value2');
        await client.set('key3', 'value3');
        console.log('Keys saved successfully.');
        const keyToRead = 'key2';
        const value = await client.get(keyToRead);
        if (value) {
            console.log(`The value for ${keyToRead} is: ${value}`);
        } else {
            console.log(`${keyToRead} does not exist.`);
        }
    } catch (error) {
        console.error('Error while interacting with Redis:', error);
    } finally {
        // Close the connection to Redis
        await client.quit();
    }
}
module.exports = { manageRedis };
