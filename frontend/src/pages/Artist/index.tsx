import ArtistLayout from "./layout";
import ArtistHeader from "./components/ArtistHeader";
import AlbumList from "./components/AlbumList";



export default function ArtistPage() {
 
  return (
    <ArtistLayout>
      <div className="w-full max-w-[1360px] flex flex-col gap-4">
        <ArtistHeader />
        <AlbumList />
      </div>
    </ArtistLayout>
  )
}