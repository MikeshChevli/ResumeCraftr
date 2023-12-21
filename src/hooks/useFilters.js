import { useQuery } from "react-query";

const useFilters = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "globuleFilters",
    async () => ({ searchTerm: "" }),
    { refetchOnWindowFocus: false }
  );
  return { data, isLoading, isError, refetch };
};

export default useFilters;
