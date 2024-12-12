'use client';

import { useChatInfoStore } from '@/store/chatInfo';
import ChatItem from './ChatItem';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import Icon from '../ui/Icon';
import useRoomMessages from '@/hooks/api/useRoomMessages';
import { useMembersActions, useMembersStore } from '@/store/members';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import useMembers from '@/hooks/api/useMembers';
import dayjs from 'dayjs';
import { FrontMessage, useMessagesActions, useMessageStore } from '@/store/messageStore';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WEB_SOCKET_URL } from '@/env';
import { getCookie } from 'cookies-next';
import { useThreadActions } from '@/store/thread';

interface Props {
  h: number;
}

interface SocketMessage {
  data: {
    content: string;
    created_at: string;
    data: {
      emoji_count: number;
      emojis: null;
      text: string;
      thread_count: number;
      type: string;
    };
    message_id: string;
    message_thread_id: string;
    sender_id: string;
    ts: string;
    updated_at: string;
    updated_by: string;
  };
  room_id: string;
  sender_id: string;
  sub_type: string;
  type: string;
  workspace_id: string;
}

export default function Messages({ h }: Props) {
  const workspaceId = useChatInfoStore((state) => state.workspaceId);
  const roomId = useChatInfoStore((state) => state.roomId);

  const { data: messageData } = useRoomMessages({ workspaceId, roomId });
  const members = useMembersStore((state) => state.members);
  const memberIds = useMemo(() => {
    const ids: Set<string> = new Set();
    if (messageData?.messages) {
      messageData.messages.forEach((item) => {
        ids.add(item.sender_id);
      });
    }

    return Array.from(ids);
  }, [messageData]);
  const { data: membersData } = useMembers({ workspaceId, memberIds });
  const { addMember } = useMembersActions();
  // const initMemberRef = useRef<boolean>(false);

  useEffect(() => {
    // if (!initMemberRef.current && membersData) {
    if (membersData) {
      // initMemberRef.current = true;
      addMember(membersData);
    }
  }, [membersData, addMember]);

  const { initMessages, addMessage, changeThreadCount, setAddType } = useMessagesActions();
  const sortedMessages = useMemo(() => {
    const messageMap = new Map<string, FrontMessage[]>();

    if (messageData?.messages) {
      messageData.messages
        .sort((a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix())
        .forEach((item) => {
          const { content, message_id, sender_id, created_at, data } = item;
          const date = dayjs(item.created_at).format('YYYYMMDD');
          const target = messageMap.get(date);
          const message = {
            content,
            message_id,
            sender_id,
            created_at,
            thread_count: data.thread_count,
          };

          messageMap.set(date, target ? [...target, message] : [message]);
        });
    }

    return messageMap;
  }, [messageData]);
  // const initMessageRef = useRef<boolean>(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const { readyState, lastJsonMessage, sendJsonMessage } = useWebSocket<SocketMessage>(
    `${WEB_SOCKET_URL}/chat-server/ws?token=${getCookie('access_token')}`,
    {
      // onOpen: () => console.log("websocket opened"),
      shouldReconnect: (closeEvent) => true,
    }
  );

  const initSocketRef = useRef<boolean>(false);

  useEffect(() => {
    if (!initSocketRef.current) {
      initSocketRef.current = true;

      sendJsonMessage({ type: 'CONNECT' });
      return () => {
        sendJsonMessage({ type: 'DISCONNECT' });
      };
    }
  }, [sendJsonMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    console.log('web socket status: ', connectionStatus);
  }, [connectionStatus]);

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === 'MESSAGE') {
      console.log('lastJsonMessage in: ', lastJsonMessage);
      console.log('socketMessage in: ', lastJsonMessage.data.content);
      const { message_id, sender_id, created_at, content } = lastJsonMessage.data;
      const key = dayjs(created_at).format('YYYYMMDD');
      setAddType('MESSAGE');
      addMessage({
        key,
        message: {
          message_id,
          sender_id,
          created_at,
          content: content,
        },
      });
    }
  }, [lastJsonMessage, addMessage, setAddType]);

  const { addMessage: addTreadMessage } = useThreadActions();

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === 'THREAD') {
      console.log('lastJsonMessage in: ', lastJsonMessage);
      console.log('socketMessage in: ', lastJsonMessage.data.content);
      const { message_id, message_thread_id, sender_id, created_at, content } = lastJsonMessage.data;
      addTreadMessage({
        message_id,
        message_thread_id,
        sender_id,
        created_at,
        content,
      });
      setAddType('THREAD');
      changeThreadCount(message_id);
    }
  }, [lastJsonMessage, addTreadMessage, changeThreadCount, setAddType]);

  useEffect(() => {
    // if (!initMessageRef.current && sortedMessages.size > 0) {
    if (sortedMessages.size > 0) {
      setAddType('MESSAGE');
      // initMessageRef.current = true;
      initMessages(sortedMessages);
    } else {
      setAddType('MESSAGE');
      initMessages(new Map());
    }
  }, [sortedMessages, initMessages, setAddType]);

  const messages = useMessageStore((state) => state.messages);
  const addType = useMessageStore((state) => state.addType);

  useEffect(() => {
    if (scrollerRef.current && addType === 'MESSAGE') {
      scrollerRef.current.scrollTo(0, scrollerRef.current.scrollHeight - scrollerRef.current.clientHeight);
    }
  }, [messages, addType]);

  return (
    <div className="overflow-y-scroll" style={{ height: `${h}px` }} ref={scrollerRef}>
      <div className="flex flex-col gap-y-3 pt-4 pb-4">
        {Array.from(messages.keys()).map((key) => {
          const messageList = messages.get(key);
          const today = dayjs().format('YYYYMMDD');

          return (
            <Fragment key={key}>
              {key === today && (
                <div className="my-3">
                  <Separator />
                  <div className="flex justify-center -mt-3">
                    <Badge variant="outline" className="text-gray-400 bg-white gap-x-1">
                      오늘 <Icon name="ChevronDown" size={12} />
                    </Badge>
                  </div>
                </div>
              )}

              {messageList?.map((msg) => {
                const time = dayjs(msg.created_at).format('A h:mm').replace('AM', '오전').replace('PM', '오후');

                const currentMember = members.get(msg.sender_id);

                return (
                  <ChatItem
                    key={msg.message_id}
                    workspaceId={workspaceId as string}
                    roomId={roomId as string}
                    messageId={msg.message_id}
                    message={msg.content}
                    name={currentMember?.nickname || 'guest'}
                    time={time}
                    thumbnail={currentMember?.profile_image || '/static/images/member.png'}
                    thread_count={msg.thread_count}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
