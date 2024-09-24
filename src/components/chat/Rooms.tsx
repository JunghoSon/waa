"use client";

import {
  ToggleBlock,
  ToggleBlockContent,
  ToggleBlockTrigger,
} from "../common/ToggleBlock";
import { Button } from "../ui/button";
import { useChatInfoActions, useChatInfoStore } from "@/store/chatInfo";
import { useEffect, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useRooms from "@/hooks/api/useRooms";
import Icon from "../ui/Icon";

export default function Rooms() {
  const { setRoomId } = useChatInfoActions();
  const workspaceId = useChatInfoStore((state) => state.workspaceId);
  const roomId = useChatInfoStore((state) => state.roomId);
  const { data } = useRooms(workspaceId);

  useEffect(() => {
    if (data?.[0] && !roomId) {
      setRoomId(data[0].room_id);
    }
  }, [data, roomId, setRoomId]);

  const channelList = useMemo(
    () => (data || []).filter((item) => item.room_type === "CHANNEL"),
    [data]
  );

  const groupList = useMemo(
    () => (data || []).filter((item) => item.room_type === "GOURP"),
    [data]
  );

  const dmList = useMemo(
    () => (data || []).filter((item) => item.room_type === "DM"),
    [data]
  );

  return (
    <>
      {channelList.length > 0 && (
        <ToggleBlock className="mt-3">
          <ToggleBlockTrigger>채널</ToggleBlockTrigger>
          <ToggleBlockContent className="mt-2">
            {channelList.map((item) => (
              <Button
                key={item.room_id}
                variant={item.room_id === roomId ? "secondary" : "ghost"}
                className="w-full h-8 gap-x-2 justify-start p-0 pl-3"
              >
                <Icon name="Hash" size={15} />
                {item.name}
              </Button>
            ))}
          </ToggleBlockContent>
        </ToggleBlock>
      )}

      {groupList.length > 0 && (
        <ToggleBlock className="mt-3">
          <ToggleBlockTrigger>그룹 메세지</ToggleBlockTrigger>
          <ToggleBlockContent className="mt-2">
            {groupList.map((item) => (
              <Button
                key={item.room_id}
                variant={item.room_id === roomId ? "secondary" : "ghost"}
                className="w-full h-8 gap-x-2 justify-start p-0 pl-3"
              >
                {item.name}
              </Button>
            ))}
          </ToggleBlockContent>
        </ToggleBlock>
      )}

      {dmList.length > 0 && (
        <ToggleBlock className="mt-3">
          <ToggleBlockTrigger>다이렉트 메세지</ToggleBlockTrigger>
          <ToggleBlockContent className="mt-2">
            {dmList.map((item) => (
              <Button
                key={item.room_id}
                variant={item.room_id === roomId ? "secondary" : "ghost"}
                className="w-full h-8 gap-x-2 justify-start p-0 pl-3"
              >
                <Avatar className="w-6 h-6 rounded-lg">
                  <AvatarImage src="/static/images/member.png" alt="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {item.name}
              </Button>
            ))}
          </ToggleBlockContent>
        </ToggleBlock>
      )}
    </>
  );
}
