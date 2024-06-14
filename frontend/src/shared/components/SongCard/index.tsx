import { Image as ImageProps, Song } from "src/shared/model";
import { Image } from "src/shared/components/Image";
import { toast } from "react-toastify";



interface ExtendedSong extends Song {
  image?: ImageProps | null;
}

interface Props {
  song: ExtendedSong
}

export default function SongCard({ song }: Props) {
  function onChangeSong(song: Props["song"]) {
    if(!song.playable) {
      toast.warning("This song is not playable.");
    }
  }
  
  return (
    <label 
      key={song.id} 
      htmlFor={song.id} 
      className="
        w-full
        song-container 
        group 
        cursor-pointer 
        flex 
        p-2 
        gap-2
      "         
      onClick={() => onChangeSong(song)}
    >
      {song?.image && (
        <Image
          src={song.image.url}
          blurHash={song.image.blurHash}
          alt={song.name}
          className="w-10 h-10 rounded-md"
          grayscaleEffect={false}
        />
      )}

      <input 
        type="checkbox" 
        defaultChecked={song.playable} 
        disabled={!song.playable}
        className="hidden" 
        name="songs" 
        id={song.id} 
        value={song.id}
      />
      <div
        className="
          w-full
        "
      >
        <p 
          className="
            w-fit
            h-min

            text-lg 
            text-white 
            text-wrap
            font-medium

            relative

            line-clamp-1
            truncate
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

            line-clamp-1
            truncate
          "
        >
          {song.artists?.join(", ")}
        </p>
      </div>
    </label>
  )
}