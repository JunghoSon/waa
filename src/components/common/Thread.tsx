import {
  ThreadMessage,
  useThreadActions,
  useThreadStore,
} from "@/store/thread";
import { Button } from "../ui/button";
import Icon from "../ui/Icon";
import { ResizablePanel } from "../ui/resizable";
import ChatItem from "../chat/ChatItem";
import Editor from "../chat/Editor";
import { Separator } from "../ui/separator";
import { useEffect, useMemo } from "react";
import useThreadMessages from "@/hooks/api/useThreadMessages";
import dayjs from "dayjs";
import { useMembersStore } from "@/store/members";

export default function Thread() {
  const { message, name, time, thumbnail, workspaceId, roomId, messageId } =
    useThreadStore();

  const { data: messageData } = useThreadMessages({
    workspaceId,
    roomId,
    messageId,
  });

  const { initMessages, addMessage, setShowThread } = useThreadActions();
  const sortedMessages = useMemo(() => {
    let messages: ThreadMessage[] = [];

    if (messageData?.messages) {
      messages = messageData.messages
        .sort((a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix())
        .map(
          ({
            content,
            created_at,
            sender_id,
            message_id,
            message_thread_id,
          }) => ({
            content,
            created_at,
            sender_id,
            message_id,
            message_thread_id,
          })
        );
    }

    return messages;
  }, [messageData]);

  useEffect(() => {
    if (sortedMessages.length > 0) {
      initMessages(sortedMessages);
    }
  }, [sortedMessages, initMessages]);

  const messages = useThreadStore((state) => state.messages);
  const members = useMembersStore((state) => state.members);

  return (
    <ResizablePanel id="thread" className="min-w-48" minSize={25} order={3}>
      <div className="flex items-center justify-between h-12 px-4 border-b">
        <span>스레드</span>
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6"
          onClick={() => setShowThread(false)}
        >
          <Icon name="X" />
        </Button>
      </div>

      <div className="pt-4 gap-y-2">
        <ChatItem
          workspaceId={workspaceId as string}
          roomId={roomId as string}
          messageId={messageId as string}
          message={message as string}
          name={name || "guest"}
          time={time as string}
          thumbnail={thumbnail || "/static/images/member.png"}
        />
      </div>

      <div className="p-3">
        <Separator />
      </div>

      <div className="gap-y-2">
        {messages.map((item) => {
          const currentMember = members.get(item.sender_id);
          const time = dayjs(item.created_at)
            .format("A h:mm")
            .replace("AM", "오전")
            .replace("PM", "오후");

          return (
            <ChatItem
              key={item.message_thread_id}
              workspaceId={workspaceId as string}
              roomId={roomId as string}
              messageId={item.message_id}
              message={item.content}
              name={currentMember?.nickname || "guest"}
              time={time}
              thumbnail={
                currentMember?.profile_image || "/static/images/member.png"
              }
              isThread
            />
          );
        })}
      </div>

      <div className="p-3">
        <Editor isThread messageId={messageId} />
      </div>
    </ResizablePanel>
  );
}
