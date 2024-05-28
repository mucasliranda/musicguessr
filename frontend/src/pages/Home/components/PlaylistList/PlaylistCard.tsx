import { Link } from "react-router-dom";
import { CarouselItem } from "src/shared/components/Carousel";
import { Playlist } from "src/shared/model";
import { Image } from "src/shared/components/Image";



interface Props {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: Props) {
  return (
    <CarouselItem className="basis-[212px]">
      <div className="w-[180px] h-full pb-4 bg-onBackground rounded-lg group transition-opacity">
        <Link to={`/playlist/${playlist.id}`}>
          {!!playlist.image && (
            <Image src={playlist.image} alt={playlist.name} size={180} />
          )}
          <p
            className="
              w-fit
              m-2

              text-base 
              text-white 
              text-wrap
              font-medium

              relative
            "
          >
            {playlist.name}
            <span
              className="
                absolute 
                h-[2px] 
                left-0 
                bottom-0 
                w-0 
                bg-primary
                transition-width 
                duration-500 
                ease-in-out
                group-hover:w-full
              "
            />
          </p>
        </Link>
      </div>
    </CarouselItem>
  )
}