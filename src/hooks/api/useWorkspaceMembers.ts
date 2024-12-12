import { getWorkspaceMembers, WorkspaceMember } from '@/api/roomApi';
import { useQuery } from '@tanstack/react-query';

interface Return {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: WorkspaceMember[];
}

export default function useWorkspaceMembers(workspaceId: string): Return {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['getWorkspaceMembers', workspaceId],
    queryFn: () => getWorkspaceMembers(workspaceId),
    enabled: !!workspaceId,
  });

  return {
    isLoading,
    isError,
    isSuccess,
    data: data?.data,
  };
}
