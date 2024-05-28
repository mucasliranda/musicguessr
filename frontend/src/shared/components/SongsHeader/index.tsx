import { FullAlbum, FullPlaylist } from "src/shared/model"



interface Props {
  album: FullAlbum | FullPlaylist;
}

export default function AlbumHeader({ album: { name, image } }: Props) {

  return (
    <div
      className="flex items-start gap-4"
    >
      <div className="w-[200px] h-[200px] rounded-lg">
        <img
          src={image}
          alt={name}
          className="
            object-cover 
            w-full 
            h-full 
            rounded-lg
          
            transition 
            duration-500 
            ease-in-out 
            transform 
            hover:scale-105
          "
        />
      </div>

      <h2
        className="text-5xl font-bold text-white"
      >{name}</h2>
    </div>
  )
}