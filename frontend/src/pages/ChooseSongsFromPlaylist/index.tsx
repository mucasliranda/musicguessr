import ChooseSongsFromPlaylistLayout from "./layout";
import SongsList from "./components/SongsList";
import SongsHeader from "./components/SongsHeader";



export default function ChooseSongsFromPlaylistPage() {

  return (
    <ChooseSongsFromPlaylistLayout>
      <div
        className="flex flex-col h-full max-h-[calc(100vh-32px)] w-full max-w-7xl"
      >
        <SongsHeader />

        <SongsList />
      </div>
    </ChooseSongsFromPlaylistLayout>
  )
}