import { Album } from "src/shared/model";
import AlbumCard from "./AlbumCard";



interface Props {
  albums: Array<Album> | undefined;
}

export default function AlbumList({ albums }: Props) {
  return (
    <div 
      className="
        grid 
        
        gap-2
        sm:gap-4
        lg:gap-8

        grid-cols-[repeat(auto-fit,minmax(160px,auto))]
        sm:grid-cols-[repeat(auto-fit,minmax(176px,auto))]
        
        place-items-center
      "
    >
      {albums && albums.map((album) => <AlbumCard key={album.id} album={album} />)}
    </div>
  )
}