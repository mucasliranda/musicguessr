import "./styles.css"
import { useEffect } from "react"
import { useToast } from "src/shared/components/Toast/use-toast";
import { Button } from "src/shared/components/Button";
import { useNavigate } from "react-router-dom";
import { PlaylistSong } from "src/shared/model";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";
import SongCard from "src/shared/components/SongCard";



interface Props {
  songs: PlaylistSong[]
}

export default function SongsList({ songs }: Props) {
  const navigate = useNavigate();
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const songsId = formData.getAll('songs') as Array<string>;
    const songsSelecteds = songs.filter(song => songsId.includes(song.id));
    const gameId = window.crypto.randomUUID();

    await fetchApi.createGameBySongs({ gameId, songs: songsSelecteds });

    navigate(`/game/${gameId}`);
  }

  useEffect(() => {
    if(songs.some(song => !song.playable)) {
      const description = "Some songs are not playable.";
      toast({
        description: description,
      })
    }
  }, [])

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