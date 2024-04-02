import { createClient, RedisClientType } from 'redis';

import dotenv from 'dotenv';
dotenv.config();
interface CacheContractRepository {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
}

class CacheRepository implements CacheContractRepository {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: `${process.env.CACHE_URL}:${process.env.CACHE_PORT}` //'redis://localhost:6379'
        });
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        this.initialize();
    }

    private async initialize() {
        await this.client.connect();
    }

    public async get(key: string): Promise<string | null> {
        try {
            const value = await this.client.get(key);
            return value;
        } catch (error) {
            console.error(`Error retrieving data from cache for key ${key}: `, error);
            return null;
        }
    }

    public async set(key: string, value: string, ttl: number = 3600): Promise<void> {
        try {
            await this.client.set(key, value, { EX: ttl });
        } catch (error) {
            console.error(`Error saving data to cache for key ${key}: `, error);
        }
    }

    public async del(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error(`Error deleting key ${key} from cache: `, error);
        }
    }

    public async delByPattern(pattern: string): Promise<void> {
        let cursor = 0; 
        do {
            const scanResult = await this.client.scan(cursor, {
                MATCH: pattern,
                COUNT: 100,
            });
            cursor = Number(scanResult.cursor); 
            const keys = scanResult.keys;
    

            if (keys.length > 0) {
                await this.client.del(keys);
            }
        } while (cursor !== 0);
    }
}

export {CacheRepository, CacheContractRepository};
