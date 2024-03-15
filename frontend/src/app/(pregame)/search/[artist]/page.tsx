import { randomUUID } from "crypto";
import Link from "next/link";

interface Artist {
  id: string;
  name: string;
  images: Array<{ 
    height: number;
    width: number;
    url: string
  }>;
}

async function getArtists(searchValue: string) {
  const res = await fetch(`http://localhost:3005/search/artists?q=${searchValue}`);
  const body = await res.json();

  return body.artists as Array<Artist>;
}

export default async function SearchArtistId({ params }:{ params?: { [key: string]: string | string[] | undefined } }) {
  const { artist } = params as { [key: string]: string };

  const artists = await getArtists(artist)

  return (
    <div
      className="pt-4"
    >
      <ul
        className="grid gap-8 grid-cols-5 2xl:grid-cols-6"
      >
        {artists && artists.map((artist) => {
          const rightImage = (() => {
            const image = artist.images.find((img) => img.width === 320 || img.height === 320);
            return image ? image : artist.images[0];
          })();

          return (
            <li key={artist.id} className="aspect-square transition-opacity bg-onBackground rounded-lg pb-4">
              <Link href={`/play/${randomUUID()}?artist=${artist.id}`}>
                {!!rightImage && (
                  <div className="w-[200px] h-[200px] rounded-ss-lg rounded-se-lg overflow-hidden">
                    <img
                      src={rightImage.url}
                      alt={artist.name}
                      className="
                      object-cover 
                      w-full 
                      h-full 

                      grayscale-30
                      hover:grayscale-0

                      transition 
                      duration-500 
                      ease-in-out 
                      transform 
                      hover:scale-110"
                    />
                  </div>
                )}
                <p className="mt-2 ml-2 text-base text-white font-medium">{artist.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}