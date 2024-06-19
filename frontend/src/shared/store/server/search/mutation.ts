import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "src/shared/repositories/FetchApiRepository.ts";


export const useChangeSearch = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchApi.getFullSearch,
    mutationKey: ['search'],
    onMutate: async (search: string) => {
      return navigate(`/search?q=${search}`);
    }

  });
}