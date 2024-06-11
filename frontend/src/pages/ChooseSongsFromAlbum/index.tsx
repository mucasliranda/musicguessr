import ChooseSongsFromAlbumLayout from "./layout";
import SongsList from "src/pages/ChooseSongsFromAlbum/components/SongsList";
import SongsHeader from "./components/SongsHeader";



export default function ChooseSongsFromAlbumPage() {

  return (
    <ChooseSongsFromAlbumLayout>
      <div
        className="flex flex-col h-full max-h-[calc(100vh-32px)] w-full max-w-7xl"
      >
        <SongsHeader />

        <SongsList />
      </div>
    </ChooseSongsFromAlbumLayout>
  )
}