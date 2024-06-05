import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import ChooseSongsFromAlbumLayout from "./layout";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";
import SongsList from "src/pages/ChooseSongsFromAlbum/components/SongsList";
import SongsHeader from "./components/SongsHeader";



export default function ChooseSongsFromAlbumPage() {
  const { albumId } = useParams();
  
  const { } = useQuery({ queryKey: ['album', albumId], queryFn: () => fetchApi.getFullAlbum(albumId)});

  return (
    <ChooseSongsFromAlbumLayout>
      <div
        className="flex flex-col h-full max-h-[calc(100vh-32px)] w-full max-w-7xl"
      >
        <SongsHeader />

        <SongsList />
      </div>
    </ChooseSongsFromAlbumLayout>
  )
}