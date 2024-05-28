import { useParams } from "react-router-dom";
import ArtistLayout from "./layout";
import AlbumList from "src/shared/components/AlbumList";
import { useQuery } from "@tanstack/react-query";
import { Album } from "src/shared/model";
import ArtistHeader from "./components/ArtistHeader";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";



export default function ArtistPage() {
  const { artistId } = useParams();

  const { data } = useQuery({ queryKey: ['artist', artistId], queryFn: () => fetchApi.getAlbumsByArtistId(artistId)})

  return (
    <ArtistLayout>
      <div className="w-full max-w-[1360px] flex flex-col gap-4">
        <ArtistHeader />
        <AlbumList albums={data} />
      </div>
    </ArtistLayout>
  )
}