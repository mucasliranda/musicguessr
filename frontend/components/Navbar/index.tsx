'use client'

import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from 'next/navigation';
import GlassIcon from "../GlassIcon";


export default function Navbar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <nav className="w-full flex justify-center">
      <form onSubmit={onSubmit} className="max-w-[550px] w-full relative">
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          placeholder="Search for artists..."
          autoComplete="off"
          defaultValue={searchParams?.get('q') || ''}
          className="w-full rounded-lg border bg-[#F3F4F6] px-4 py-3 pr-10 text-lg text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <GlassIcon />
        </div>
      </form>
    </nav>
  )
}