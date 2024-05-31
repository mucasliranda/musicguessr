import { Playlist } from "src/shared/model"
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "src/shared/components/Carousel"
import { CarouselCard } from "src/shared/components/Card"



interface Props {
  playlists: Array<Playlist>,
  category: string
}

export default function PlaylistList({ playlists, category }: Props) {
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
          {playlists.map((playlist) => <CarouselCard key={playlist.id} item={playlist} linkTo={`/playlist/${playlist.id}`} />)}
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