import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";



export const useGetSearch = (searchValue: string) => 
  useQuery({ queryKey: ['search'], refetchOnWindowFocus: false, queryFn: () => {
    return fetchApi.getFullSearch(searchValue)
  }});