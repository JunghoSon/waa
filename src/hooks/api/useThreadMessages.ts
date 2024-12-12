import { getThreadMessages, RoomMessage } from "@/api/roomApi";
import { useQuery } from "@tanstack/react-query";

interface Return {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: RoomMessage;
}

export default function useThreadMessages({
  workspaceId,
  roomId,
  messageId,
}: {
  workspaceId?: string;
  roomId?: string;
  messageId?: string;
}): Return {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["useThreadMessages", workspaceId, roomId, messageId],
    queryFn: () =>
      getThreadMessages({
        workspaceId: workspaceId as string,
        roomId: roomId as string,
        messageId: messageId as string,
      }),
    enabled: !!workspaceId && !!roomId,
  });

  return {
    isLoading,
    isError,
    isSuccess,
    data: data?.data,
  };
}
