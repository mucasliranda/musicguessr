import "./styles.css"
import { Song } from "src/shared/model";
import { useEffect } from "react"
import { useToast } from "src/shared/components/Toast/use-toast";
import { Button } from "src/shared/components/Button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SongCard from "src/shared/components/SongCard";



interface Props {
  songs: Song[]
}

export default function SongsList({ songs }: Props) {
  const [searchParams, _] = useSearchParams();
  const { artistId, albumId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const songsId = formData.getAll('songs') as Array<string>;

    const params = new URLSearchParams(searchParams.toString());

    // clean all selected songs from this album previously
    params.delete(albumId || "")

    songsId.forEach(songId => {
      params.append(albumId || "", songId)
    })

    navigate(`/artist/${artistId}?${params.toString()}`)
  }

  useEffect(() => {
    if(songs.some(song => !song.playable)) {
      const description = "Some songs are not playable";
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
        {"<---"}
      </Button>
    </form>
  )
}