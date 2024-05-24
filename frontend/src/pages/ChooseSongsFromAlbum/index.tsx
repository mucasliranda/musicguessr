import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import { FullAlbum } from "src/shared/model";
import AlbumHeader from "./components/AlbumHeader";
import SongsList from "./components/SongsList";
import ChooseSongsFromAlbumLayout from "./layout";



export default function ChooseSongsFromAlbum() {
  const { albumId } = useParams();

  async function getSongs(): Promise<FullAlbum> {
    const res = await fetch(`http://localhost:3005/album?q=${albumId}`, {
      cache: 'no-cache',
    });
    
    const body = await res.json();
  
    return body.album;
  }
  
  const { data } = useQuery({ queryKey: ['album', albumId], queryFn: getSongs });

  if (!data) return null;

  return (
    <ChooseSongsFromAlbumLayout>
      <div
        className="flex flex-col h-full max-h-screen w-full max-w-7xl"
      >
        <AlbumHeader album={data} />

        <SongsList songs={data.songs} />
      </div>
    </ChooseSongsFromAlbumLayout>
  )
}