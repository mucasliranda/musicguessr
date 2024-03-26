'use client'

import { useSearchParams } from "next/navigation";


export default function ChooseSongs({ params }: { params: { index: number } }) {
  const { index } = params;
  const searchParams = useSearchParams();
  
  console.log({ index, searchParams: `albumsId: ${searchParams.getAll('albumId')}, playlistsId: ${searchParams.getAll('playlistId')}` })

  console.log(searchParams.getAll('albumId'))

  return (<></>)
}