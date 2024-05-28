import { useQuery } from "@tanstack/react-query";
import HomeLayout from "./layout";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";
import PlaylistList from "./components/PlaylistList";

const playlistsIds = [
  {
    id: '0JQ5DAqbMKFQIL0AXnG5AK',
    name: 'Alta',
  },
  {
    id: '0JQ5DAqbMKFM6qDjp13Rui',
    name: 'Amplifika',
  },
  {
    id: '0JQ5DAqbMKFDXXwE9BDJAr',
    name: 'Rock',
  },
  {
    id: '0JQ5DAqbMKFEC4WFtoNRpw',
    name: 'Pop',
  },
  {
    id: '0JQ5DAqbMKFDkd668ypn6O',
    name: 'Metal',
  },
  // {
  //   id: '0JQ5DAqbMKFz6FAsUtgAab',
  //   name: 'Lançamentos',
  // },
  {
    id: '0JQ5DAqbMKFziKOShCi009',
    name: 'Anime',
  }
]

export default function HomePage() {
  const { data: playlists } = useQuery({
    queryKey: ['playlists'],
    queryFn: () => {
      return Promise.all(
        playlistsIds.map(async (playlist) => {
          const result = await fetchApi.getPlaylistsByCategory(playlist.id);
          return {
            label: playlist.name,
            data: result,
          };
        })
      );
    },
  });

  if (!playlists) return null;

  return (
    <HomeLayout>
      {playlists.map((playlist) => (
        <PlaylistList key={playlist.label} playlists={playlist.data} category={playlist.label} />
      ))}

      {/* <PlaylistList playlists={alta} category={'alta'} />

      <PlaylistList playlists={amplifika} category={'amplifika'} />

      <PlaylistList playlists={rock} category={'rock'} /> */}
    </HomeLayout>
  )
}