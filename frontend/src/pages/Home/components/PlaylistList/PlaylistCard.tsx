import { Link } from "react-router-dom";
import { CarouselItem } from "src/shared/components/Carousel";
import { Playlist } from "src/shared/model";
import { Image } from "src/shared/components/Image";



interface Props {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: Props) {
  return (
    <CarouselItem 
      className="
        lg:basis-[176px]
        2xl:basis-[192px]
      "
    >
      <div
        className="
          bg-onBackground 
          rounded-lg 
          group 
          transition-opacity
          lg:w-[160px] 
          2xl:w-[176px]
          lg:h-[224px]
          2xl:h-[240px]
        "
      >
        <Link to={`/playlist/${playlist.id}`}>
          {!!playlist.image && (
            <Image src={playlist.image} alt={playlist.name} className="lg:h-[160px] 2xl:h-[176px]" />
          )}
          <p
            className="
              w-36
              h-fit
              m-2

              text-base 
              text-white 
              text-wrap
              font-medium

              relative

              truncate
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