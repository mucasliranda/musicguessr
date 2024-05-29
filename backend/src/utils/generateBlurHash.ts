import { encode } from "blurhash";
import * as sharp from 'sharp';
import fetch from 'node-fetch';



async function getImageData(imageUrl: string): Promise<{ data: Uint8ClampedArray; width: number; height: number }> {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from ${imageUrl}`);
  }

  const imageBuffer = await response.buffer();

  const { data, info } = await sharp(imageBuffer)
    .resize(32, 32)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  return {
    data: new Uint8ClampedArray(data),
    width: info.width,
    height: info.height,
  };
}

// Função para gerar o BlurHash
export async function generateBlurHash(imageUrl: string): Promise<string> {
  const { data, width, height } = await getImageData(imageUrl);
  const blurHash = encode(data, width, height, 4, 4);
  return blurHash;
}