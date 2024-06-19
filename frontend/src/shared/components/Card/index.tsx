import { Link } from "react-router-dom";
import { CarouselItem } from "src/shared/components/Carousel";
import { Artist, Playlist } from "src/shared/model";
import { Image } from "src/shared/components/Image";



interface Props {
  item: Playlist | Artist;
  linkTo: string;
}

export function Card({ item, linkTo }: Props) {
  return (
    <div
      className="
        bg-onBackground 
        rounded-lg 
        group 
        transition-opacity

        w-full
        h-full
      "
    >
      <Link
        to={linkTo}
      >
        {!!item.image && (
          <Image
            src={item.image.url}
            blurHash={item.image.blurHash}
            alt={item.name}
          />
        )}
        <p
          className="
            w-fit
            h-10
            m-2

            text-base 
            text-white 
            text-wrap
            font-medium

            leading-5
            line-clamp-2
            truncate
            
            relative
          "
        >
          {item.name}
          <span
            className="
              absolute 
              h-[2px]
              top-[18px] 
              left-0 
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
  )
}


export function CarouselCard(props: Props) {
  return (
    <CarouselItem 
      className="
        basis-[176px]
      "
    >
      <Card {...props} />
    </CarouselItem>
  )
}