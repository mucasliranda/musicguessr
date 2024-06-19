import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";



export const useGetAlbum = (albumId: string) =>
  useQuery({
    queryKey: [albumId],
    queryFn: () => fetchApi.getFullAlbum(albumId),
  });

export const useGetAlbumByArtistId = (artistId: string) =>
  useQuery({
    queryKey: [artistId],
    queryFn: () => fetchApi.getAlbumsByArtistId(artistId),
  });