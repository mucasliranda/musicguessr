import { useParams } from "react-router-dom";
import ArtistLayout from "./layout";
import AlbumList from "src/shared/components/AlbumList";
import { useQuery } from "@tanstack/react-query";
import { Album } from "src/shared/model";
import ArtistHeader from "./components/ArtistHeader";



export default function ArtistPage() {
  const { artistId } = useParams();

  async function getAlbums() {
    if (artistId) {
      const res = await fetch(`http://localhost:3005/artist/albums?q=${artistId}`,{
        cache: "no-cache",
      });
      
      const body = await res.json();
    
      return body.albums as Array<Album>;
    }
    return [];
  }

  const { data } = useQuery({ queryKey: ['artist', artistId], queryFn: getAlbums })

  return (
    <ArtistLayout>
      <div className="w-full max-w-[1360px] flex flex-col gap-4">
        <ArtistHeader />
        <AlbumList albums={data} />
      </div>
    </ArtistLayout>
  )
}