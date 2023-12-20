import { useQuery } from "react-query";

const useFilters = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "globleFilters",
    async () => ({ searchTerm: "" }),
    { refetchOnWindowFocus: false }
  );
  return { data, isLoading, isError, refetch };
};

export default useFilters;
