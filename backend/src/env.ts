import { str, envsafe } from 'envsafe';
import { config } from 'dotenv';

config();

export const env = envsafe({
  SPOTIFY_CLIENT_ID: str(),
  SPOTIFY_CLIENT_SECRET: str(),
});
