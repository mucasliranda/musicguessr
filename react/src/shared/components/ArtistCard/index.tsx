import { Link } from "react-router-dom";
import { Artist } from "src/shared/model";


interface Props {
  artist: Artist;
}

export default function ArtistCard({ artist }: Props) {

  return (
    <li key={artist.id} className="w-[200px] pb-4 bg-onBackground rounded-lg group transition-opacity cursor-pointer">
      <Link to={`/artist/${artist.id}`}>
        {!!artist.image && (
          <div className="w-[200px] h-[200px] rounded-ss-lg rounded-se-lg overflow-hidden">
            <img
              src={artist.image}
              alt={artist.name}
              className="
              object-cover 
              w-full 
              h-full 
              
              grayscale-30
              hover:grayscale-0
              
              transition 
              duration-500 
              ease-in-out 
              transform 
              hover:scale-110"
              />
          </div>
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