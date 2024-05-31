import { useQuery } from "@tanstack/react-query";
import SearchLayout from "./layout";
import { useSearchParams } from "react-router-dom";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";
import ArtistList from "./components/ArtistList";
import PlaylistList from "../Home/components/PlaylistList";



export default function SearchPage() {
  const [searchParams, _] = useSearchParams();

  const searchValue = searchParams.get('q')?.split('+').join(' ') || '';

  const { data } = useQuery({ queryKey: ['search'], queryFn: () => fetchApi.getFullSearch(searchValue)});

  if (!data) return null;

  return (
    <SearchLayout>
      <PlaylistList playlists={data.playlists} category={'Playlists'} />
      <div
        className="flex flex-col gap-4"
      >
        <h3 className="text-white underline decoration-primary text-2xl font-bold">Artists</h3>
        <ArtistList artists={data.artists} />
      </div>
    </SearchLayout>
  )
}