import { Upload } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogClose, DialogTitle } from "src/shared/components/Dialog";
import { cn } from "src/shared/utils";
import { Button } from "../../Button";
import { useNavigate } from "react-router-dom";



export default function ImportPlaylistDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaylistInvalid, setIsPlaylistInvalid] = useState(false);
  const navigate = useNavigate();

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;

    if (url.length > 0) {
      return validatePlaylist(url);
    }

    return setIsPlaylistInvalid(false);
  }

  function validatePlaylist(url: string) {
    const regex = /https:\/\/open\.spotify\.com\/playlist\/([^?]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      return setIsPlaylistInvalid(true);
    }
  }

  function onPlaylistSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isPlaylistInvalid) {
      const formData = new FormData(e.currentTarget);
      const url = formData.get('url') as string;
      const playlistId = validatePlaylist(url);
  
      navigate(`/playlist/${playlistId}`);
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button 
          className="
            h-fit

            right-3

            p-2
            rounded-full
            hover:bg-primary

            group
          "
        >
          <Upload
            className="
              text-primary
              group-hover:text-white
            "
          />
        </button>
      </DialogTrigger>

      <DialogContent
        className="
          w-[calc(100vw-2rem)]

          md:w-full
        "
      >
        <DialogHeader>
          <DialogTitle>Import any playlist from Spotify and play!</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div
          className="
            flex
            flex-col
            gap-4
          "
        >
          <form
            onSubmit={onPlaylistSubmit}
            className="
              w-full
              flex
              flex-col
              gap-2

              md:flex-row
            "
          >
            <fieldset
              className="w-full"
            >
              <input
                type="text"
                placeholder="Paste your playlist URL here"
                onChange={onInputChange}
                name="url"
                autoFocus
                className={cn(`
                  w-full

                  rounded-lg
                  border
                  border-transparent

                  hover:border-[#FFFFFF33]
                  
                  focus:border-primary
                  focus:outline-none
        
                  bg-onBackground
                  px-3 
                  py-2
                  text-base
                  text-neutral-100
                  placeholder:text-neutral-500`,
                  isPlaylistInvalid && 'border-red-700 hover:border-red-700 focus:border-red-700'
                )}
              />
              {isPlaylistInvalid && (
                <small
                  className="
                    text-red-700
                    ml-2
                  "
                >
                  Playlist not valid!
                </small> 
              )}
            </fieldset>

            <Button
              type="submit"
              disabled={isPlaylistInvalid}
              className="
                w-full
                md:w-fit
              "
            >
              Import
            </Button>
          </form>

          <img
            src='./playlist-tutorial.jpg'
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}