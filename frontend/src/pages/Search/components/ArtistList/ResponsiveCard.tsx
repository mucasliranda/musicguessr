import { Link } from "react-router-dom";
import { Artist, Playlist } from "src/shared/model";
import { Image } from "src/shared/components/Image";



interface Props {
  item: Playlist | Artist;
  linkTo: string;
}

export default function ResponsiveCard({ item, linkTo }: Props) {
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
