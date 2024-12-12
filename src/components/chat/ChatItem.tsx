import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@radix-ui/react-context-menu";
import { useThreadActions, useThreadStore } from "@/store/thread";
import { Button } from "../ui/button";

interface Props {
  workspaceId: string;
  roomId: string;
  messageId: string;
  name: string;
  time: string;
  message: string;
  thumbnail: string;
  isThread?: boolean;
  thread_count?: number;
}

export default function ChatItem({
  workspaceId,
  roomId,
  messageId,
  message,
  name,
  thumbnail,
  time,
  isThread,
  thread_count,
}: Props) {
  const currentMessageId = useThreadStore((state) => state.messageId);
  const { setShowThread, setThreadInfo, initMessages } = useThreadActions();
  const handleTread = () => {
    if (messageId === currentMessageId) return;
    initMessages([]);
    setThreadInfo({
      workspaceId,
      roomId,
      messageId,
      message,
      name,
      thumbnail,
      time,
    });
    setShowThread(true);
  };
  return (
    <div className="flex gap-x-2 px-4">
      <Avatar className="w-10 h-10 rounded-lg">
        <AvatarImage src={thumbnail} alt="" />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex gap-x-2 items-end">
          <span className="text-sm font-bold">{name}</span>
          <span className="text-xs text-gray-600">{time}</span>
        </div>
        <div className="text-base">
          {/* TODO: 여러 줄 처리, markdown?? */}
          {isThread ? (
            <p>{message}</p>
          ) : (
            <ContextMenu>
              <ContextMenuTrigger>{message}</ContextMenuTrigger>
              <ContextMenuContent className="min-w-[220px] overflow-hidden rounded-md bg-white p-[5px] border shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                <ContextMenuItem onClick={handleTread}>
                  스레드의 댓글
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          )}
        </div>

        {!!(thread_count && thread_count > 0) && (
          <Button
            variant="ghost"
            onClick={handleTread}
            className="p-0 text-blue-600 hover:bg-white"
          >
            {thread_count}개의 댓글
          </Button>
        )}
      </div>
    </div>
  );
}
