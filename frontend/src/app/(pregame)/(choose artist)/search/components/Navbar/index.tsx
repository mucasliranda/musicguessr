'use client'

import { useParams, useRouter } from 'next/navigation';
import GlassIcon from "../GlassIcon";



export default function Navbar() {
  const params = useParams() as { artist: string };
  const artist = params.artist?.split('%20').join(' ');
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search.value as string;

    router.push(`/search/${search}`);
  }

  return (
    <nav className="w-full flex justify-center">
      <form onSubmit={onSubmit} className="max-w-[550px] w-full relative">
        <div className="absolute left-0 top-0 ml-3 flex h-full items-center">
          <GlassIcon />
        </div>
        <input
          key={artist}
          type="text"
          name="search"
          placeholder="Search for artists..."
          autoComplete="off"
          defaultValue={artist || ''}
          className="
            w-full 

            rounded-3xl
            border
            border-transparent

            hover:border-[#FFFFFF33]
            
            focus:border-primary
            focus:outline-none

            bg-onBackground px-4 py-3 pl-10 
            text-base text-neutral-100 
            placeholder:text-neutral-500"
        />
      </form>
    </nav>
  )
}