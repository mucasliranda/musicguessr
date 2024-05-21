import { useQuery } from "@tanstack/react-query";
import HomeLayout from "./layout";
import { Artist } from "src/shared/model";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ArtistList from "src/shared/components/ArtistList";



export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const artist = searchParams.get('q')?.split('+').join(' ') || '';

  // const getArtist = useCallback(async () => {
  //   if (artist) {
  //     const res = await fetch(`http://localhost:3005/search/artists?q=${artist}`,{
  //       cache: "no-cache",
  //     });
      
  //     const body = await res.json();
    
  //     return body.artists as Array<Artist>;
  //   }
  //   return [];
  // }, [artist])

  async function getArtist() {
    if (artist) {
      const res = await fetch(`http://localhost:3005/search/artists?q=${artist}`,{
        cache: "no-cache",
      });
      
      const body = await res.json();
    
      return body.artists as Array<Artist>;
    }
    return [];
  }

  const { data } = useQuery({ queryKey: ['artists'], queryFn: getArtist })

  return (
    <HomeLayout>
      <ArtistList artists={data || []} />
    </HomeLayout>
  )
}