import { Album } from "src/shared/model";
import EditSongs from "./EditSongs";
import { useSearchParams } from "react-router-dom";
import { Image } from "src/shared/components/Image";



interface Props {
  album: Album;
}

export default function AlbumCard({ album }: Props) {  
  const [searchParams, setSearchParams] = useSearchParams()

  const isSelected = searchParams.getAll('album').includes(album.id)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const albumId = event.target.value;
    const params = new URLSearchParams(searchParams.toString())

    if (params.has('album', albumId)) {
      // deletar a opção do album
      params.delete('album', albumId)
      
      // deletar todas as musicas selecionadas do album
      // params.delete(albumId)
    } else {
      params.append('album', albumId)
    }

    setSearchParams(params)
  };

  return (
    <label 
      key={album.id} 
      htmlFor={album.id} 
      className="
        bg-onBackground 
        rounded-lg 
        group 
        transition-opacity

        cursor-pointer
        w-full
        h-full
        relative
      "
    >
      <input
        type="checkbox"
        defaultChecked={isSelected}
        className="peer hidden"
        name="albums" id={album.id}
        value={album.id}
        onChange={handleCheckboxChange}
      />

      <EditSongs albumId={album.id} />

      {!!album.image && (
        <Image 
          src={album.image.url}
          alt={album.name}
          blurHash={album.image.blurHash}
        />
      )}
      
      <p 
        className="
          w-fit
          h-fit
          m-2

          text-base 
          text-white 
          text-wrap
          font-medium

          leading-5
          line-clamp-2
          truncate

          relative

          group/paragraph
        "
      >
        {album.name}
        <span 
          className="
            absolute 
            h-[2px] 
            left-0 
            bottom-0 
            w-0 
            bg-primary
            transition-width 
            duration-500 
            ease-in-out

            group-hover:w-full
            
            peer-has-[:checked]:w-full
            peer-checked:group-[]/paragraph:w-full
          "
        />
      </p>

    </label>
  )
}