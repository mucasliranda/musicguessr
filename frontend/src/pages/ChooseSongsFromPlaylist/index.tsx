import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import ChooseSongsFromPlaylistLayout from "./layout";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";
import SongsList from "./components/SongsList";
import SongsHeader from "./components/SongsHeader";



export default function ChooseSongsFromPlaylistPage() {
  const { playlistId } = useParams();
  
  const {} = useQuery({ queryKey: ['playlist', playlistId], queryFn: () => fetchApi.getPlaylist(playlistId || '')});

  return (
    <ChooseSongsFromPlaylistLayout>
      <div
        className="flex flex-col h-full max-h-[calc(100vh-32px)] w-full max-w-7xl"
      >
        <SongsHeader />

        <SongsList />
      </div>
    </ChooseSongsFromPlaylistLayout>
  )
}