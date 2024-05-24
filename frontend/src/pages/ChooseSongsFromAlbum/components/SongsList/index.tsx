import "./styles.css"
import { Song } from "src/shared/model";
import { useEffect } from "react"
import { useToast } from "src/shared/components/Toast/use-toast";
import { Button } from "src/shared/components/Button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";



interface Props {
  songs: Song[]
}

export default function SongsList({ songs }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
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

    console.log(songs)
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
        
      //   (e) => {
      //   e.preventDefault();
      //   const formData = new FormData(e.currentTarget)

      //   const songs = formData.getAll('songs') as Array<string>;

      // }}
    >
      <div
        className="
          flex
          flex-col
          grow-1
          overflow-y-auto
        "
      >
        {songs.map((song) => {
          return (
            <label key={song.id} htmlFor={song.id} className="song-container group cursor-pointer">
              <input 
                type="checkbox" 
                defaultChecked={song.playable} 
                disabled={!song.playable} 
                className="peer hidden" 
                name="songs" 
                id={song.id} 
                value={song.id}
              />
              <p 
                className="
                  w-fit
                  m-2

                  text-lg 
                  text-white 
                  text-wrap
                  font-medium

                  relative

                  group/paragraph
                "
              >
                {song.name}
                <span 
                  className="
                    absolute 
                    h-[2px] 
                    left-0 
                    bottom-0 
                    w-0 
                    bg-primary
                    transition-width 
                    duration-500 
                    ease-in-out

                    group-hover:w-full
                    
                    peer-has-[:checked]:w-full
                    peer-checked:group-[]/paragraph:w-full
                  "
                />
              </p>
            </label>
          )
        })}
      </div>

      <Button className="ml-auto" type="submit">
        {"<---"}
      </Button>
    </form>
  )
}