import AlbumCard from "./AlbumCard";
import { Skeleton } from "src/shared/components/Skeleton";
import { useParams } from "react-router-dom";
import { useGetAlbumByArtistId } from "src/shared/store/server/album/queries";



export default function AlbumList() {
  const { artistId } = useParams();

  const { data: albums } = useGetAlbumByArtistId(artistId || '')
  
  return (
    <div 
      className="
        grid 
        
        gap-2
        sm:gap-4
        lg:gap-8

        grid-cols-[repeat(auto-fit,minmax(160px,auto))]
        sm:grid-cols-[repeat(auto-fit,minmax(176px,auto))]
        
        place-items-center
      "
    >
      {!!albums ? 
        albums.map((album) => <AlbumCard key={album.id} album={album} />)
      : Array.from({ length: 18 }).map((_, index) => <LoadingSkeleton key={index} />)}
    </div>
  )
}



function LoadingSkeleton() {
  return (
    <Skeleton
      className="
        w-full
        h-full
        rounded-lg
      "
    >
      <Skeleton
        className="
          w-full 
          h-[160px]
        "
      />
      <div
        className="
          h-14
        "
      >
        <Skeleton className="w-12" />
      </div>
    </Skeleton>
  )
}