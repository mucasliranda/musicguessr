import { FullAlbum } from "@/shared/model";
import SongsList from "../../../../components/SongsList";
import SongsHeader from "../../../../components/SongsHeader";



async function getAlbum(artistId: string) {
  const res = await fetch(`http://localhost:3005/album?q=${artistId}`, {
    cache: 'no-cache',
  });
  
  const body = await res.json();

  return body.album as FullAlbum;
}

export default async function ChooseSongs({ params, searchParams }: { params: { index: string }, searchParams: { [key: string]: string | string[]}}) {
  const { index } = params;

  const albums = Array.isArray(searchParams.album) ? searchParams.album : [searchParams.album]; 
  const playlists = Array.isArray(searchParams.playlist) ? searchParams.playlist : [searchParams.playlist];

  const currentValue: string = [...albums, ...playlists][index];
  const currentType = currentValue ? albums.find((value) => currentValue.includes(value)) ? 'album' : 'playlist' : undefined;

  const album = await getAlbum(currentValue);

  return (
    <div
      className="flex flex-col h-full max-h-screen w-full max-w-7xl p-8"
    >
      <SongsHeader image={album.image} name={album.name} />

      <SongsList songs={album.songs} />
    </div>
  )
}