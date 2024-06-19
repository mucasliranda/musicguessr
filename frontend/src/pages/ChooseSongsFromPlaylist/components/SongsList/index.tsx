import "./styles.css";
import { Button } from "src/shared/components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";
import SongCard from "src/shared/components/SongCard";
import { Skeleton } from "src/shared/components/Skeleton";
import { useGetPlaylist } from "src/shared/store/server/playlist/queries";



export default function SongsList() {
  const navigate = useNavigate();
  const { playlistId } = useParams();

  const { data } = useGetPlaylist(playlistId || '');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const songsId = formData.getAll('songs') as Array<string>;
    const songsSelecteds = songs.filter(song => songsId.includes(song.id));
    const gameId = window.crypto.randomUUID();

    await fetchApi.createGameBySongs({ gameId, songs: songsSelecteds });

    navigate(`/game/${gameId}`);
  }

  if (!data) return <LoadingSkeleton />;

  const { songs } = data;

  return (
    <form
      className="
        flex 
        flex-col
        mt-6
        gap-4
        overflow-y-auto
      "
      onSubmit={onSubmit}
    >
      <div
        className="
          flex
          flex-col
          grow-1
          overflow-y-auto
        "
      >
        {songs.map((song) => <SongCard key={song.id} song={song}/>)}
      </div>

      <Button className="ml-auto" type="submit">
        Create Game
      </Button>
    </form>
  )
}



function LoadingSkeleton() {
  return (
    <div
      className="
        w-full
        h-full
        flex 
        flex-col
        mt-6
        gap-4
        overflow-y-auto
      "
    >
      <div
        className="
          w-full
          flex
          flex-col
          grow-1
          overflow-hidden
        "
      >
        {[...Array(18)].map((_, index) => {
          return (
            <div
              className="
                w-full
                flex 
                p-2 
                gap-2
              "
              key={index}
            >
              <Skeleton className="w-10 h-10 rounded-md" />

              <div
                className="
                  flex
                  flex-col
                  justify-between
                  w-full
                  h-12
                  pb-2
                "
              >
                <Skeleton className="w-60 h-4" />
                <Skeleton className="w-40 h-3" />
              </div> 
            </div> 
          )
        })}
      </div>

      <Skeleton className="w-32 h-16 ml-auto" />
    </div>
  )
}