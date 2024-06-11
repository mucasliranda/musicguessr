import { useParams } from "react-router-dom";
import { Skeleton } from "src/shared/components/Skeleton";
import { Image } from "src/shared/components/Image";
import { useGetPlaylist } from "src/shared/store/server/playlist/queries";



export default function SongsHeader() {
  const { playlistId } = useParams();

  const { data } = useGetPlaylist(playlistId || '');
  
  if (!data) return <LoadingSkeleton />;

  const { name, image } = data;

  return (
    <div
      className="
        flex
        group
        md:items-start
        gap-4
        
        justify-center
        sm:justify-start
      "
    >
      {image && (
        <Image
          src={image.url}
          alt={name}
          blurHash={image.blurHash}
          className="
            w-[200px] 
            h-[200px] 
            rounded-lg
          "
          grayscaleEffect={false}
        />
      )}

      <h2
        className="
          text-5xl 
          font-bold 
          text-white

          hidden
          sm:block
        "
      >{name}</h2>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div
      className="
        flex
        md:items-start
        gap-4
        
        justify-center
        sm:justify-start
      "
    >
      <Skeleton className="w-[200px] h-[200px] rounded-lg" />

      <Skeleton 
        className="
          h-12 
          w-64
          hidden
          sm:block
        " 
      />
    </div>
  )
}