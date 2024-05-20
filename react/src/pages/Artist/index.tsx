import { useParams } from "react-router-dom";
import ArtistLayout from "./layout";



export default function ArtistPage() {
  const { artistId } = useParams();

  return (
    <ArtistLayout>
      <h1>Artist: {artistId}</h1>
    </ArtistLayout>
  )
}