import HomeLayout from "./layout";
import PlaylistList from "./components/PlaylistList";
import { useGetHomePlaylists } from "src/shared/store/server/playlist/queries";



export default function HomePage() {
  const { data: playlists } = useGetHomePlaylists();

  return (
    <HomeLayout>
      {playlists.map((playlist) => (
        <PlaylistList key={playlist.label} playlists={playlist.data} category={playlist.label} />
      ))}
    </HomeLayout>
  )
}