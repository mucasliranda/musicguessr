import "./styles.css"
import { Button } from "src/shared/components/Button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SongCard from "src/shared/components/SongCard";
import { Skeleton } from "src/shared/components/Skeleton";
import { useGetAlbum } from "src/shared/store/server/album/queries";



export default function SongsList() {
  const [searchParams, _] = useSearchParams();
  const { artistId, albumId } = useParams();
  const navigate = useNavigate();

  const { data } = useGetAlbum(albumId || '');

  if (!data) return <LoadingSkeleton />;

  const { songs } = data;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const songsId = formData.getAll('songs') as Array<string>;

    const params = new URLSearchParams(searchParams.toString());

    // clean all selected songs from this album previously
    params.delete(albumId || "")

    songsId.forEach(songId => {
      params.append(albumId || "", songId)
    })

    navigate(`/artist/${artistId}?${params.toString()}`)
  }

  return (
    <form
      className="
        flex 
        flex-col
        mt-6
        gap-4
        overflow-y-auto
      "
      onSubmit={onSubmit}
    >
      <div
        className="
          flex
          flex-col
          grow-1
          overflow-y-auto
        "
      >
        {songs.map((song) => <SongCard key={song.id} song={song}/>)}
      </div>

      <Button className="ml-auto" type="submit">
        {"<---"}
      </Button>
    </form>
  )
}



function LoadingSkeleton() {
  return (
    <div
      className="
        w-full
        h-full
        flex 
        flex-col
        mt-6
        gap-4
        overflow-y-auto
      "
    >
      <div
        className="
          w-full
          flex
          flex-col
          grow-1
          overflow-hidden
        "
      >
        {[...Array(18)].map((_, index) => {
          return (
            <div
              className="
                w-full
                flex 
                p-2 
                gap-2
              "
              key={index}
            >
              <div
                className="
                  flex
                  flex-col
                  justify-between
                  w-full
                  h-12
                  pb-2
                "
              >
                <Skeleton className="w-60 h-4" />
                <Skeleton className="w-40 h-3" />
              </div> 
            </div> 
          )
        })}
      </div>

      <Skeleton className="w-32 h-16 ml-auto" />
    </div>
  )
}