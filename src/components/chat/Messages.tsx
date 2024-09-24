"use client";

import { useChatInfoStore } from "@/store/chatInfo";
import { ScrollArea } from "../ui/scroll-area";
import ChatItem from "./ChatItem";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import Icon from "../ui/Icon";
import useRoomMessages from "@/hooks/api/useRoomMessages";
import { useMembersActions, useMembersStore } from "@/store/members";
import { Fragment, useEffect, useMemo, useRef } from "react";
import useMembers from "@/hooks/api/useMembers";
import { Message } from "@/api/roomApi";
import dayjs from "dayjs";
import {
  FrontMessage,
  useMessagesActions,
  useMessageStore,
} from "@/store/messageStore";

export default function Messages() {
  const workspaceId = useChatInfoStore((state) => state.workspaceId);
  const roomId = useChatInfoStore((state) => state.roomId);

  const { data: messageData } = useRoomMessages({ workspaceId, roomId });
  const members = useMembersStore((state) => state.members);
  const memberIds = useMemo(() => {
    const ids: Set<string> = new Set();

    if (messageData) {
      messageData.messages.forEach((item) => {
        ids.add(item.sender_id);
      });
    }

    return Array.from(ids);
  }, [messageData]);
  const { data: membersData } = useMembers({ workspaceId, memberIds });
  const { addMember } = useMembersActions();
  const initMemberRef = useRef<boolean>(false);

  useEffect(() => {
    if (!initMemberRef.current && membersData) {
      initMemberRef.current = true;
      addMember(membersData);
    }
  }, [membersData, addMember]);

  const { initMessages } = useMessagesActions();
  const sortedMessages = useMemo(() => {
    const messageMap = new Map<string, FrontMessage[]>();

    if (messageData) {
      messageData.messages.reverse().forEach((item) => {
        const { content, message_id, sender_id, created_at } = item;
        const date = dayjs(item.created_at).format("YYYYMMDD");
        const target = messageMap.get(date);
        const message = { content, message_id, sender_id, created_at };

        messageMap.set(date, target ? [...target, message] : [message]);
      });
    }

    return messageMap;
  }, [messageData]);
  const initMessageRef = useRef<boolean>(false);

  useEffect(() => {
    if (!initMessageRef.current && sortedMessages.size > 0) {
      initMessageRef.current = true;
      initMessages(sortedMessages);
    }
  }, [sortedMessages, initMessages]);

  const messages = useMessageStore((state) => state.messages);

  return (
    <>
      <ScrollArea className="w-full h-[calc(100%-7rem)] pt-4 box-border">
        <div className="flex flex-col gap-y-3">
          {Array.from(messages.keys()).map((key) => {
            const messageList = messages.get(key);
            const today = dayjs().format("YYYYMMDD");

            return (
              <Fragment key={key}>
                {key === today && (
                  <div className="my-3">
                    <Separator />
                    <div className="flex justify-center -mt-3">
                      <Badge
                        variant="outline"
                        className="text-gray-400 bg-white gap-x-1"
                      >
                        오늘 <Icon name="ChevronDown" size={12} />
                      </Badge>
                    </div>
                  </div>
                )}

                {messageList?.map((msg) => {
                  const time = dayjs(msg.created_at)
                    .format("A h:mm")
                    .replace("AM", "오전")
                    .replace("PM", "오후");

                  const currentMember = members.get(msg.sender_id);

                  return (
                    <ChatItem
                      key={msg.message_id}
                      message={msg.content}
                      name={currentMember?.nickname || "guest"}
                      time={time}
                      thumbnail={
                        currentMember?.profile_image ||
                        "/static/images/member.png"
                      }
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
