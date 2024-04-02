// config.ts

import dotenv from 'dotenv';

dotenv.config();

interface GeneralConfig {
  url: string;
  port: number;
}

interface DatabaseConfig {
  driver: string;
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
  logger: boolean;
}

interface CacheConfig {
  url: string;
  port: number;
  user?: string;
  password?: string;
}

interface RemoteApiConfig {
  url: string;
  protocol: string;
  method: string;
}

interface Config {
  general: GeneralConfig;
  database: DatabaseConfig;
  cache: CacheConfig;
  remoteApi: RemoteApiConfig;
}

const config: Config = {
  general: {
    url: process.env.URL ?? 'http://localhost',
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  database: {
    driver: process.env.DATABASE_DRIVER ?? 'postgres',
    name: process.env.DATABASE_NAME ?? 'default',
    host: process.env.DATABASE_HOST ?? '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    user: process.env.DATABASE_USER ?? 'user',
    password: process.env.DATABASE_PASSWORD ?? 'password',
    logger: process.env.DATABASE_LOGGER === 'true',
  },
  cache: {
    url: process.env.CACHE_URL ?? 'redis://localhost',
    port: parseInt(process.env.CACHE_PORT ?? '6379', 10),
    user: process.env.CACHE_USER,
    password: process.env.CACHE_PASSWORD,
  },
  remoteApi: {
    url: process.env.REMOTE_URL ?? 'https://rickandmortyapi.com',
    protocol: process.env.REMOTE_PROTOCOL ?? 'graphql',
    method: process.env.REMOTE_METHOD ?? 'POST',
  },
};

export default config;
