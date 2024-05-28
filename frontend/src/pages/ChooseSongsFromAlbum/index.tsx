import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import SongsHeader from "../../shared/components/SongsHeader";
import ChooseSongsFromAlbumLayout from "./layout";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";
import SongsList from "src/pages/ChooseSongsFromAlbum/components/SongsList";



export default function ChooseSongsFromAlbumPage() {
  const { albumId } = useParams();
  
  const { data } = useQuery({ queryKey: ['album', albumId], queryFn: () => fetchApi.getFullAlbum(albumId)});

  if (!data) return null;

  return (
    <ChooseSongsFromAlbumLayout>
      <div
        className="flex flex-col h-full max-h-[calc(100vh-32px)] w-full max-w-7xl"
      >
        <SongsHeader album={data} />

        <SongsList songs={data.songs} />
      </div>
    </ChooseSongsFromAlbumLayout>
  )
}