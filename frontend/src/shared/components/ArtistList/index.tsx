import { Artist } from "src/shared/model"
import ArtistCard from "../ArtistCard"



interface Props {
  artists: Array<Artist>
}

export default function ArtistList({ artists }: Props) {
  return (
    <ul className="grid gap-8 grid-cols-5 2xl:grid-cols-6">
      {artists.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
    </ul>
  )
}