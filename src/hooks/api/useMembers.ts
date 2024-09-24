import { getMembers, Member } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

interface Return {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: Member[];
}

export default function useMembers({
  workspaceId,
  memberIds,
}: {
  workspaceId?: string;
  memberIds: string[];
}): Return {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["getMembers", workspaceId],
    queryFn: () =>
      getMembers({
        workspaceId: workspaceId as string,
        memberIds: memberIds as string[],
      }),
    enabled: !!workspaceId && memberIds.length > 0,
  });

  return {
    isLoading,
    isError,
    isSuccess,
    data: data?.data,
  };
}
