import "./styles.css"
import { useEffect } from "react"
import { useToast } from "src/shared/components/Toast/use-toast";
import { Button } from "src/shared/components/Button";
import { useNavigate } from "react-router-dom";
import { PlaylistSong } from "src/shared/model";



interface Props {
  songs: PlaylistSong[]
}

export default function SongsList({ songs }: Props) {
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const songsId = formData.getAll('songs') as Array<string>;

    // criar game com essas musicas

    // const params = new URLSearchParams(searchParams.toString());

    // // clean all selected songs from this album previously
    // params.delete(albumId || "")

    // songsId.forEach(songId => {
    //   params.append(albumId || "", songId)
    // })

    // navigate(`/artist/${artistId}?${params.toString()}`)
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
        {songs.map((song) => {
          return (
            <label 
              key={song.id} 
              htmlFor={song.id} 
              className="song-container group cursor-pointer flex p-2 gap-2"         
              onClick={() => {
                if(!song.playable) {
                  toast({
                    description: "This song is not playable",
                  })
                }
              }}
            >
              <img 
                src={song.image} 
                alt={song.name} 
                className="w-10 h-10 rounded-md"
              />
              <input 
                type="checkbox" 
                defaultChecked={song.playable} 
                disabled={!song.playable}
                className="hidden" 
                name="songs" 
                id={song.id} 
                value={song.id}
        
              />
              <div>
                <p 
                  className="
                    w-fit
                    h-min

                    text-lg 
                    text-white 
                    text-wrap
                    font-medium

                    relative
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
                    "
                  />
                </p>

                <p
                  className="
                    text-sm
                    text-gray-500
                    text-wrap
                    font-medium
                    dark:text-red-400
                  "
                >
                  {song.artist.join(", ")}
                </p>
              </div>
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