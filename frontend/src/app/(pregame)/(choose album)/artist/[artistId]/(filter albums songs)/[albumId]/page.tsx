import SongsHeader from "@/app/(pregame)/(choose songs)/components/SongsHeader";
import SongsList from "@/app/(pregame)/(choose album)/components/SongsList";
import { FullAlbum } from "@/shared/model";



async function getAlbum(albumId: string) {
  const res = await fetch(`http://localhost:3005/album?q=${albumId}`, {
    cache: 'no-cache',
  });
  
  const body = await res.json();

  return body.album as FullAlbum;
}

export default async function ChooseSongs({ params, searchParams }: { params: { albumId: string }, searchParams: { [key: string]: string | string[]}}) {
  const { albumId } = params;

  const album = await getAlbum(albumId);

  // const albums = Array.isArray(searchParams.album) ? searchParams.album : [searchParams.album]; 
  // const playlists = Array.isArray(searchParams.playlist) ? searchParams.playlist : [searchParams.playlist];

  // const currentValue: string = [...albums, ...playlists][albumId];
  // const currentType = currentValue ? albums.find((value) => currentValue.includes(value)) ? 'album' : 'playlist' : undefined;

  return (
    <div
      className="flex flex-col h-full max-h-screen w-full max-w-7xl"
    >
      <SongsHeader image={album.image} name={album.name} />

      <SongsList songs={album.songs} />
    </div>
  )
}