import { Artist } from "src/shared/model"
import ArtistCard from "../ArtistCard"



interface Props {
  artists: Array<Artist>
}

export default function ArtistList({ artists }: Props) {
  return (
    <ul className="grid gap-8 grid-cols-5 2xl:grid-cols-6">
      {artists.map((artist) => <ArtistCard artist={artist} />)}
    </ul>
  )
}