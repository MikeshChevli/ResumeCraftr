import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getUserDetail } from "../api";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userDatail = await getUserDetail();
        return userDatail;
      } catch (error) {
        if (!error.message.includes("not authenticated")) {
          toast.error("Something went wrong. Please try again later.");
        }
      }
    },
    { refetchOnWindowFocus: false }
  );
  return { data, isLoading, isError, refetch };
};

export default useUser;
