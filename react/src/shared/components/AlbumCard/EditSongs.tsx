import { cn } from "src/shared/utils";

// import { EllipsisVertical } from 'lucide-react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  albumId: string;
}

export default function EditSongs({ albumId, ...props }: Props) {
  // const pathname = usePathname()

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
      {/* <Link href={`${pathname}/${albumId}`}> */}
        {/* <EllipsisVertical
          size={20}
        /> */}
        <p>...</p>
      {/* </Link> */}
    </div>
  )
}