import Link from "next/link";
import ArtistCard from "../components/ArtistCard";

interface Artist {
  id: string;
  name: string;
  image: string;
}

async function getArtists(searchValue: string) {
  const res = await fetch(`http://localhost:3005/search/artists?q=${searchValue}`,{
    cache: "no-cache",
  });
  
  const body = await res.json();

  return body.artists as Array<Artist>;
}

export default async function SearchArtistId({ params }:{ params?: { [key: string]: string | string[] | undefined } }) {
  const { search } = params as { [key: string]: string };

  const artists = await getArtists(search)

  return (
    <>
      {artists && artists.map((artist) => ArtistCard({ artist }))}
    </>
  );
}