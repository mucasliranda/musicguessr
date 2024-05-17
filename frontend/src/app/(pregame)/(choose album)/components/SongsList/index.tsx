'use client'

import { Song } from "@/shared/model"
import "./styles.css"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/shared/components/Button"
import { useEffect } from "react"
import { useToast } from "@/shared/components/Toast"



interface Props {
  songs: Song[]
}

export default function SongsList({ songs }: Props) {
  const { artistId, albumId } = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { toast } = useToast();

  // function onNextPage() {
  //   const nextIndex = Number(index) + 1;

  //   if (nextIndex < [...searchParams.getAll('album'), ...searchParams.getAll('playlist')].length) {
  //     return router.push(`/game/${gameId}/songs/${nextIndex}?${searchParams.toString()}`)
  //   }

  //   return router.push(`/game/${gameId}`)
  // }

  // async function onSubmit(songsId: Array<string>) {
  //   await fetch('http://localhost:3005/game', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       songs: songs.filter(song => songsId.includes(song.id)),
  //     }),
  //   });
  
  //   onNextPage(); 
  // }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)

    const selectedSongs = formData.getAll('songs') as Array<string>;

    console.log(selectedSongs)

    if (songs.length > selectedSongs.length) {
      // selecionou algumas musicas, não está todas preenchidas, preciso "pushar" as selecionadas 
      // para o searchParams, fazendo um key value com o albumId e as musicas selecionas

      const params = new URLSearchParams(searchParams.toString())

      selectedSongs.forEach((songId) => {
        params.append(albumId.toString(), songId)
      })

      router.push(`${pathname}?${params.toString()}`)
    }

    
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
        {"--->"}
      </Button>
    </form>
  )
}