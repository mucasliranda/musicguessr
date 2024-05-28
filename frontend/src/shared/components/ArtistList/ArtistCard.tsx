import { Link } from "react-router-dom";
import { Artist } from "src/shared/model";
import { Image } from "src/shared/components/Image";



interface Props {
  artist: Artist;
}

export default function ArtistCard({ artist }: Props) {

  return (
    <li className="w-[200px] pb-4 bg-onBackground rounded-lg group transition-opacity cursor-pointer">
      <Link to={`/artist/${artist.id}`}>
        {!!artist.image && (
          <Image src={artist.image} alt={artist.name} size={200} />
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
          {artist.name}
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
    </li>
  )
}