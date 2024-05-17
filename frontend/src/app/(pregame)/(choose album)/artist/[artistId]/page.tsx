// 'use client'

import { Button } from "@/shared/components/Button";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import AlbumCard from "../../components/AlbumCard";



interface Album {
  id: string;
  name: string;
  image: string;
}

async function getAlbums(artistId: string) {
  const res = await fetch(`http://localhost:3005/artist/albums?q=${artistId}`, {
    cache: 'no-cache',
  });
  
  const body = await res.json();

  return body.albums as Array<Album>;
}

export default async function ArtistPage({ params }:{ params?: { [key: string]: string | string[] | undefined } }) {
  const { artistId } = params as { [key: string]: string };

  const albums = await getAlbums(artistId);

  return (
    <form className="flex flex-col items-start gap-8 overflow-y-auto" action={async (formData: FormData) => {
        "use server"
      
        const albums = formData.getAll('albums');
        const gameId = randomUUID();
      
        await fetch('http://localhost:3005/game', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gameId: gameId,
          }),
        });
      
        redirect(`/game/${gameId}/songs/0?${albums.map((album) => `album=${album}`).join('&')}`);
      }} >
      <div className="w-full flex">
        <Button type="submit" className="ml-auto">
          Choose Songs
        </Button>
      </div>

      <div className="grid gap-8 grid-cols-5 2xl:grid-cols-6">
        {albums && albums.map((album) => <AlbumCard key={album.id} album={album} />)}
      </div>
    </form>
  )
}


