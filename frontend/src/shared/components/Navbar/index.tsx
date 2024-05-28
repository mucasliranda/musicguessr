import { useNavigate, useSearchParams } from "react-router-dom";
import GlassIcon from "../GlassIcon";
import { useQueryClient } from "@tanstack/react-query";



export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigate();

  const queryClient = useQueryClient();

  const artist = searchParams.get('q')?.split('+').join(' ') || '';

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search.value as string;

    setSearchParams({ q: search });

    queryClient.invalidateQueries({ queryKey: ['artists'] });

    navigation(`/search?q=${search}`);
  }

  return (
    <nav className="w-full flex justify-center">
      <form onSubmit={onSubmit} className="max-w-[550px] w-full relative">
        <div className="absolute left-0 top-0 ml-3 flex h-full items-center">
          <GlassIcon />
        </div>
        <input
          key={'search'}
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
            placeholder:text-neutral-500
          "
        />
      </form>
    </nav>
  )
}