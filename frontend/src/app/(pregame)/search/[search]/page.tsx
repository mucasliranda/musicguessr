import Link from "next/link";

interface Artist {
  id: string;
  name: string;
  image: string;
}

async function getArtists(searchValue: string) {
  const res = await fetch(`http://localhost:3005/search/artists?q=${searchValue}`,{
    cache: "no-cache",
  });
  
  const body = await res.json();

  console.log(body.artists)

  return body.artists as Array<Artist>;
}

export default async function SearchArtistId({ params }:{ params?: { [key: string]: string | string[] | undefined } }) {
  const { search } = params as { [key: string]: string };

  const artists = await getArtists(search)

  return (
    <>
      {artists && artists.map((artist) => {
        return (
          <li key={artist.id} className="w-[200px] pb-4 bg-onBackground rounded-lg group transition-opacity cursor-pointer">
            <Link href={`/artist/${artist.id}`}>
              {!!artist.image && (
                <div className="w-[200px] h-[200px] rounded-ss-lg rounded-se-lg overflow-hidden">
                  <img
                    src={artist.image}
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
              <p
                className="
                  w-fit
                  m-2

                  text-base 
                  text-white 
                  text-wrap
                  font-medium

                  relative
                "
              >
                {artist.name}
                <span 
                  className="
                    absolute 
                    h-[2px] 
                    left-0 
                    bottom-0 
                    w-0 
                    bg-primary
                    transition-width 
                    duration-500 
                    ease-in-out
                    group-hover:w-full
                  "
                />
              </p>
            </Link>
          </li>
        );
      })}
    </>
  );
}