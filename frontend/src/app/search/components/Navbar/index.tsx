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
        <input
          key={artist}
          type="text"
          name="search"
          placeholder="Search for artists..."
          autoComplete="off"
          defaultValue={artist || ''}
          className="w-full rounded-lg border border-primary focus:border-primary selection:border-primary bg-onBackground px-4 py-3 pr-10 text-lg text-neutral-500 placeholder:text-neutral-500"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <GlassIcon />
        </div>
      </form>
    </nav>
  )
}