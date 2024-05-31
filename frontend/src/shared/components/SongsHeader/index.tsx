import { FullAlbum, FullPlaylist } from "src/shared/model"
import { Image } from "../Image";



interface Props {
  album: FullAlbum | FullPlaylist;
}

export default function SongsHeader({ album: { name, image } }: Props) {

  return (
    <div
      className="
        flex
        group
        md:items-start
        gap-4
        
        justify-center
        sm:justify-start
      "
    >
      {image && (
        <Image
          src={image.url}
          alt={name}
          blurHash={image.blurHash}
          className="
            w-[200px] 
            h-[200px] 
            rounded-lg
          "
          grayscaleEffect={false}
        />
      )}

      <h2
        className="
          text-5xl 
          font-bold 
          text-white

          hidden
          sm:block
        "
      >{name}</h2>
    </div>
  )
}