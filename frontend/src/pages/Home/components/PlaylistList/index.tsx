import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "src/shared/components/Carousel"
import { CarouselCard } from "src/shared/components/Card"
import { useQueryClient } from "@tanstack/react-query";
import { Playlist } from "src/shared/model";
import { Skeleton } from "src/shared/components/Skeleton";



interface Props {
  category: string;
  playlists: Array<Playlist> | undefined;
}

export default function PlaylistList({ category, playlists }: Props) {
  return (
    <div
      className="flex flex-col gap-4"
    >
      <h3 className="text-white underline decoration-primary text-2xl font-bold">{category}</h3>

      <Carousel
        opts={{
          loop: true,
          align: 'start'
        }}
        className="w-full"
      >
        <CarouselContent>
          {!!playlists ?
            playlists.map((playlist) => <CarouselCard key={playlist.id} item={playlist} linkTo={`/playlist/${playlist.id}`} />)

            : Array.from({ length: 10 }).map((_, index) => <LoadingSkeleton key={index} />)
          }
        </CarouselContent>



        <CarouselPrevious
          className="
            bg-background
            hidden
            lg:inline-flex
          "
        />
        <CarouselNext
          className="
            bg-background
            hidden
            lg:inline-flex
          "
        />
      </Carousel>
    </div>
  )
}



function LoadingSkeleton() {
  return (
    <CarouselItem
      className="
        basis-[176px]
        h-[216px]
      "
    >
      <Skeleton className="w-full h-full" />
    </CarouselItem>
  )
}