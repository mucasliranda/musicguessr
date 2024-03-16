


interface Album {
  id: string;
  name: string;
  image: string;
}

async function getAlbums(artistId: string) {
  const res = await fetch(`http://localhost:3005/artist/albums?q=${artistId}`);
  const body = await res.json();

  return body as Array<Album>;
}

export default async function ArtistPage({ params }:{ params?: { [key: string]: string | string[] | undefined } }) {
  const { artistId } = params as { [key: string]: string };

  const albums = await getAlbums(artistId)

  return (
    <form className="pt-4 flex flex-col items-start gap-8" action={async (formData: FormData) => {
      "use server"

      console.log({albums: formData.getAll('albums')});
    }}>
      <button type="submit" className="py-2 px-6 rounded-lg text-lg text-white self-end bg-primary hover:bg-[#1ed760] active:scale-95">
        Start Game
      </button>

      <div className="grid gap-8 grid-cols-5 2xl:grid-cols-6">
        {albums && albums.map((album) => {
          return (
            <label key={album.id} htmlFor={album.id} className="w-[200px] pb-2 bg-onBackground rounded-lg group transition-opacity cursor-pointer">
              <input type="checkbox" className="peer hidden" name="albums" id={album.id} value={album.id}/>
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
          );
        })}

      </div>
    </form>
  )
}