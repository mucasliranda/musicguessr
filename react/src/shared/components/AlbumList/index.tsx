import { Album } from "src/shared/model";
import AlbumCard from "../AlbumCard";



interface Props {
  albums: Array<Album> | undefined;
}

export default function AlbumList({ albums }: Props) {

  return (
    <div className="grid gap-8 grid-cols-5 2xl:grid-cols-6">
      {albums && albums.map((album) => <AlbumCard key={album.id} album={album} />)}
    </div>
  )
}