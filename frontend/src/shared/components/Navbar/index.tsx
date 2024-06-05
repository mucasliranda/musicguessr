import { useNavigate, useSearchParams } from "react-router-dom";
import GlassIcon from "../GlassIcon";
import { useQueryClient } from "@tanstack/react-query";
import { Search, Upload, X } from "lucide-react";
import ImportPlaylistDialog from "./ImportPlaylistDialog";



export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigate();

  const queryClient = useQueryClient();

  const artist = searchParams.get('q')?.split('+').join(' ') || '';

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log({ artist })
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search.value as string;

    setSearchParams({ q: search });

    queryClient.invalidateQueries({ queryKey: ['artists'] });

    navigation(`/search?q=${search}`);
  }

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length !== 0) {
      return setSearchParams({ q: e.target.value });
    }
    return navigation('/');
  }

  function clearSearch() {
    navigation('/');
  }

  return (
    <nav className="w-full max-w-[550px] flex justify-between items-center gap-2">
      <form 
        onSubmit={onSubmit} 
        className="
          w-full 
          flex 
          items-center 
          justify-between 
          relative
        "
      >
        <div className="absolute left-0 top-0 ml-3 flex h-full items-center">
          <Search className="text-neutral-500" />
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
  
            bg-onBackground
            px-4 py-3 pl-10
            text-base
            text-neutral-100
            placeholder:text-neutral-500
          "
          autoFocus
          onChange={onChangeInput}
        />

        {!!artist && (
          <div 
            className="
              h-fit

              absolute
              right-3

              p-1
              rounded-full
              hover:bg-[#FFFFFF33]
            "
            onClick={clearSearch}
          >
            <X className="text-neutral-500" />
          </div>
        )}

      </form>

      <ImportPlaylistDialog />
    </nav>
  )
}