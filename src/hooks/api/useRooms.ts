import { getRooms, Room } from "@/api/roomApi";
import { useQuery } from "@tanstack/react-query";

interface Return {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: Room[];
}

export default function useRooms(workspaceId?: string): Return {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["getRooms", workspaceId],
    queryFn: () => getRooms(workspaceId as string),
    enabled: !!workspaceId,
  });

  return {
    isLoading,
    isError,
    isSuccess,
    data: data?.data,
  };
}
