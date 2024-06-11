import { config } from 'dotenv';
config();

export default () => ({
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  UPSTASH_TOKEN: process.env.UPSTASH_TOKEN,
  REDIS_URL: process.env.REDIS_URL,
})
