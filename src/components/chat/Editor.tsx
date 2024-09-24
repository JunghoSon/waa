import { postMessage, SendMessage } from "@/api/messageApi";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { Separator } from "@/components/ui/separator";
import useMembership from "@/hooks/api/useMembership";
import { useChatInfoStore } from "@/store/chatInfo";
import { useMessagesActions } from "@/store/messageStore";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";

export default function Editor() {
  const [msg, setMsg] = useState<string>("");
  const workspaceId = useChatInfoStore((state) => state.workspaceId);
  const roomId = useChatInfoStore((state) => state.roomId);

  const { mutateAsync } = useMutation({
    mutationFn: (param: {
      workspaceId: string;
      roomId: string;
      message: SendMessage;
    }) => postMessage(param),
  });

  const { addMessage } = useMessagesActions();
  const { data } = useMembership();

  const handleSendMessage = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (!data || !workspaceId || !roomId || msg === "") return;
      if (e.key === "Enter") {
        mutateAsync({
          workspaceId,
          roomId,
          message: { content: msg, event_type: "MESSAGE" },
        });

        const { workspaces } = data;
        const targetWorkspace = workspaces.find(
          (item) => item.workspaceID === workspaceId
        );

        if (targetWorkspace) {
          const { memberID } = targetWorkspace;
          addMessage({
            key: dayjs().format("YYYYMMDD"),
            message: {
              sender_id: memberID,
              created_at: dayjs().format(),
              message_id: dayjs().unix(),
              content: msg,
            },
          });
        }
      }
    },
    [workspaceId, roomId, msg, mutateAsync, addMessage, data]
  );

  const handleChangeMessage = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setMsg(value);
    },
    []
  );

  return (
    <div className="flex flex-col justify-between w-full h-full border p-1 rounded-md box-border">
      <div className="flex items-center gap-x-1">
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="Bold" className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="Italic" className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="Strikethrough" className="h-4 w-4 text-gray-400" />
        </Button>
        <Separator orientation="vertical" className="h-3" />
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="Link" className="h-4 w-4 text-gray-400" />
        </Button>
        <Separator orientation="vertical" className="h-3" />
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="List" className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="ListOrdered" className="h-4 w-4 text-gray-400" />
        </Button>
        <Separator orientation="vertical" className="h-3" />
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="TextQuote" className="h-4 w-4 text-gray-400" />
        </Button>
        <Separator orientation="vertical" className="h-3" />
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="Code" className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="CodeSquare" className="h-4 w-4 text-gray-400" />
        </Button>
      </div>
      <textarea
        rows={1}
        className="border-none px-2 placeholder:text-gray-400 placeholder:text-xs outline-none placeholder:pt-1"
        placeholder="# general에 메세지 보내기"
        onChange={handleChangeMessage}
        onKeyDown={handleSendMessage}
      />
      <div className="flex items-center gap-x-1">
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="ALargeSmall" className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="SmilePlus" className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="AtSign" className="h-4 w-4 text-gray-400" />
        </Button>
        <Separator orientation="vertical" className="h-3" />
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="Video" className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="Mic" className="h-4 w-4 text-gray-400" />
        </Button>
        <Separator orientation="vertical" className="h-3" />
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Icon name="SlashSquare" className="h-4 w-4 text-gray-400" />
        </Button>
      </div>
    </div>
  );
}
