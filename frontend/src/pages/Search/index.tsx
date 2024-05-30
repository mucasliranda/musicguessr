import { useQuery } from "@tanstack/react-query";
import SearchLayout from "./layout";
import { useSearchParams } from "react-router-dom";
import ArtistList from "src/shared/components/ArtistList";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";



export default function SearchPage() {
  const [searchParams, _] = useSearchParams();

  const artist = searchParams.get('q')?.split('+').join(' ') || '';

  const { data } = useQuery({ queryKey: ['artists'], queryFn: () => fetchApi.getArtists(artist)});

  if (!data) return null;

  return (
    <SearchLayout>
      <ArtistList artists={data} />
    </SearchLayout>
  )
}