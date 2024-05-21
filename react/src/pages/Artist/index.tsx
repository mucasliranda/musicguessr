import { useParams } from "react-router-dom";
import ArtistLayout from "./layout";



export default function ArtistPage() {
  const { artistId } = useParams();

  return (
    <ArtistLayout>
      <div className="pt-4">
        <h1 className="text-4xl font-bold">Artist {artistId}</h1>
      </div>
    </ArtistLayout>
  )
}