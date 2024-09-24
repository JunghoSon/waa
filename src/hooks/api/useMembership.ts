import { getMembership, Membership } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

interface Return {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: Membership;
}

export default function useMembership(): Return {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["getMembership"],
    queryFn: () => getMembership(),
  });

  return {
    isLoading,
    isError,
    isSuccess,
    data: data?.data.user_membership,
  };
}
