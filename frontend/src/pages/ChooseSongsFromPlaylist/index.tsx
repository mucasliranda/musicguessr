import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import ChooseSongsFromPlaylistLayout from "./layout";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";
import SongsHeader from "../../shared/components/SongsHeader";
import SongsList from "./components/SongsList";



export default function ChooseSongsFromPlaylistPage() {
  const { playlistId } = useParams();
  
  const { data } = useQuery({ queryKey: ['playlist', playlistId], queryFn: () => fetchApi.getPlaylist(playlistId || '')});

  if (!data) return null;

  return (
    <ChooseSongsFromPlaylistLayout>
      <div
        className="flex flex-col h-full max-h-screen w-full max-w-7xl"
      >
        <SongsHeader album={data} />

        <SongsList songs={data.songs} />
      </div>
    </ChooseSongsFromPlaylistLayout>
  )
}