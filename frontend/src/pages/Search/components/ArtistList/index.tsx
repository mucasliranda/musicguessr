import { Artist } from "src/shared/model"
import { Card } from "src/shared/components/Card"
import { Skeleton } from "src/shared/components/Skeleton";



interface Props {
  artists: Array<Artist> | undefined;
}

export default function ArtistList({ artists }: Props) {
  return (
    <div 
      className="
        grid 

        gap-2
        sm:gap-4
        lg:gap-8

        grid-cols-[repeat(auto-fit,minmax(160px,auto))]
        sm:grid-cols-[repeat(auto-fit,minmax(176px,auto))]
        

        place-items-center
      "
    >
      {!!artists ? 
        artists.map((artist) => <Card key={artist.id} item={artist} linkTo={`/artist/${artist.id}`} />)
        : Array.from({ length: 10 }).map((_, index) => <LoadingSkeleton key={index} />)}
    </div>
  )
}



function LoadingSkeleton() {
  return (
    <Skeleton
      className="
        w-full
        h-full
        rounded-lg
      "
    >
      <Skeleton
        className="
          w-full 
          h-[160px]
        "
      />
      <div
        className="
          h-14
        "
      >
        <Skeleton className="w-12" />
      </div>
    </Skeleton>
  )
}