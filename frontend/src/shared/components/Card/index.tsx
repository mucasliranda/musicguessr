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

        w-[112px]
        md:w-[128px]
        lg:w-[144px]
        xl:w-[160px] 
        2xl:w-[176px]

        h-[176px]
        md:h-[192px]
        lg:h-[224px]
        2xl:h-[240px]
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
            className="
              h-[112px]
              md:h-[128px]
              lg:h-[144px]
              xl:h-[160px] 
              2xl:h-[176px]
            "
          />
        )}
        <p
          className="
            w-fit
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
          {item.name}
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
  )
}


export function CarouselCard(props: Props) {
  return (
    <CarouselItem 
      className="
        basis-[128px]
        md:basis-[144px]
        lg:basis-[160px]
        xl:basis-[176px]
        2xl:basis-[192px]
      "
    >
      <Card {...props} />
    </CarouselItem>
  )
}