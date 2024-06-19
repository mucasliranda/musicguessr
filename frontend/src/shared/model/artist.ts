import { Image } from "./image";

export interface Artist {
  id: string;
  name: string;
  image: Image | null;
}