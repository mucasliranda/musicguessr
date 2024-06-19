import { useQuery } from "@tanstack/react-query";
import { Playlist } from "src/shared/model";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";



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

export const useGetHomePlaylists = () => 
  useQuery({ 
    queryKey: ['playlists'],
    refetchOnWindowFocus: false, 
    queryFn: () => {
      return Promise.all(
        playlistsIds.map(async (playlist) => {
          const result = await fetchApi.getPlaylistsByCategory(playlist.id);
          return {
            label: playlist.name,
            data: result as Array<Playlist> | undefined,
          };
        })
      );
    },
    initialData: playlistsIds.map((playlist) => ({ label: playlist.name, data: undefined })),
  });

export const useGetPlaylist = (playlistId: string) => 
  useQuery({ 
    queryKey: ['playlist', playlistId],
    queryFn: () => fetchApi.getPlaylist(playlistId),
  });
