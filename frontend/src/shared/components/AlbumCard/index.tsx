import { Album } from "src/shared/model";
import EditSongs from "./EditSongs";
import { useSearchParams } from "react-router-dom";



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
    <label key={album.id} htmlFor={album.id} className="w-[200px] pb-2 bg-onBackground rounded-lg group transition-opacity cursor-pointer relative">
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
        <div className="w-[200px] h-[200px] rounded-ss-lg rounded-se-lg overflow-hidden group/image">
          <img
            src={album.image}
            alt={album.name}
            className="
              object-cover 
              w-full 
              h-full 
              
              grayscale-70
              transition 
              duration-500 
              ease-in-out 
              transform 
              group-hover:scale-110
              group-hover:grayscale-0
              peer-checked:group-[]/image:grayscale-0
              peer-checked:group-[]/image:scale-110
            "
          />
        </div>
      )}
      
      <p 
        className="
          w-fit
          m-2

          text-base 
          text-white 
          text-wrap
          font-medium

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