import { Artist } from "src/shared/model"
import { Card } from "src/shared/components/Card"



interface Props {
  artists: Array<Artist>
}

export default function ArtistList({ artists }: Props) {
  return (
    <div 
      className="
        grid 

        gap-2
        sm:gap-4
        lg:gap-8

        grid-cols-[repeat(auto-fit,minmax(144px,auto))]
        sm:grid-cols-[repeat(auto-fit,minmax(176px,auto))]
        

        place-items-center
      "
    >
      {artists.map((artist) => <Card key={artist.id} item={artist} linkTo={`/artist/${artist.id}`} />)}
    </div>
  )
}