import SearchLayout from "./layout";
import { useSearchParams } from "react-router-dom";
import ArtistList from "./components/ArtistList";
import PlaylistList from "../Home/components/PlaylistList";
import Navbar from "src/shared/components/Navbar";
import { useGetSearch } from "src/shared/store/server/search/queries";



export default function SearchPage() {
  const [searchParams, _] = useSearchParams();

  const searchValue = searchParams.get('q')?.split('+').join(' ') || '';

  const { data, isFetching } = useGetSearch(searchValue);
  
  // this is basically a loading state
  if (isFetching) {
    return (
      <SearchLayout>
        <Navbar />
        <div 
          className="
            flex
            flex-col

            w-full
            max-w-screen-2xl
            pt-4

            gap-4
          "
        >
          <PlaylistList playlists={undefined} category={'Playlists'} />
          <div
            className="flex flex-col gap-4"
          >
            <h3 className="text-white underline decoration-primary text-2xl font-bold">Artists</h3>
            <ArtistList artists={undefined} />
          </div>
      </div>
      </SearchLayout>
    )
  }

  return (
    <SearchLayout>
      <Navbar />
      <div 
        className="
          flex
          flex-col

          w-full
          max-w-screen-2xl
          pt-4

          gap-4
        "
      >
        <PlaylistList playlists={data?.playlists} category={'Playlists'} />
        <div
          className="flex flex-col gap-4"
        >
          <h3 className="text-white underline decoration-primary text-2xl font-bold">Artists</h3>
          <ArtistList artists={data?.artists} />
        </div>
      </div>
    </SearchLayout>
  )
}