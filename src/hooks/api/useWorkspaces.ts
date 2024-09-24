import { getWorkspaces, Workspace } from "@/api/roomApi";
import { useQuery } from "@tanstack/react-query";

interface Return {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: Workspace[];
}

export default function useWorkspaces(): Return {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["getWorkspaces"],
    queryFn: getWorkspaces,
  });

  return {
    isLoading,
    isError,
    isSuccess,
    data: data?.data,
  };
}
