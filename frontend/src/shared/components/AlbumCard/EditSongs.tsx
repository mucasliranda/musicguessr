import { EllipsisVertical } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { cn } from "src/shared/utils";



interface Props extends React.HTMLAttributes<HTMLDivElement> {
  albumId: string;
}

export default function EditSongs({ albumId, ...props }: Props) {
  const { artistId } = useParams();
  const [searchParams, _] = useSearchParams();

  return (
    <div
      {...props}
      className={
        cn(
          `absolute 
          top-1 
          right-1 
          p-1 
          bg-onBackground 
          rounded-full
          z-10
          transition-opacity 
          cursor-pointer 
          opacity-0 
          peer-checked:opacity-100
          
          border-2
          border-primary
          `
        )
      }
    >
      <Link 
        to={`/artist/${artistId}/${albumId}?${searchParams.toString()}`}
      >
        <EllipsisVertical
          size={20}
        />
      </Link>
    </div>
  )
}