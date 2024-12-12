'use client';

import { ToggleBlock, ToggleBlockContent, ToggleBlockTrigger } from '../common/ToggleBlock';
import { Button } from '../ui/button';
import { useChatInfoActions, useChatInfoStore } from '@/store/chatInfo';
import { useEffect, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import useRooms from '@/hooks/api/useRooms';
import Icon from '../ui/Icon';
import { useThreadActions } from '@/store/thread';
import CreateRoom from './CreateRoom';
import useMembership from '@/hooks/api/useMembership';

export default function Rooms() {
  const { setRoomId, setLastInfo } = useChatInfoActions();
  const workspaceId = useChatInfoStore((state) => state.workspaceId);
  const roomId = useChatInfoStore((state) => state.roomId);
  const { data } = useRooms(workspaceId);
  const { data: userInfo } = useMembership();

  useEffect(() => {
    if (workspaceId && !roomId && data?.[0]) {
      setRoomId(data[0].room_id);
      setLastInfo({ workspaceId, roomId: data[0].room_id });
    }
  }, [data, roomId, setRoomId, workspaceId, setLastInfo]);

  const channelList = useMemo(() => (data || []).filter((item) => item.room_type === 'CHANNEL'), [data]);

  const groupList = useMemo(() => (data || []).filter((item) => item.room_type === 'GROUP'), [data]);

  const dmList = useMemo(() => (data || []).filter((item) => item.room_type === 'DM'), [data]);

  const { setShowThread } = useThreadActions();

  return (
    <>
      {channelList.length > 0 && (
        <ToggleBlock className="mt-3">
          <ToggleBlockTrigger>
            <span>채널</span>
          </ToggleBlockTrigger>
          <ToggleBlockContent className="mt-2">
            {channelList.map((item) => (
              <Button
                key={item.room_id}
                variant={item.room_id === roomId ? 'secondary' : 'ghost'}
                className="w-full h-8 gap-x-2 justify-start p-0 pl-3"
                onClick={() => {
                  setShowThread(false);
                  setRoomId(item.room_id);
                  if (workspaceId) setLastInfo({ workspaceId, roomId: item.room_id });
                }}
              >
                <Icon name="Hash" size={15} />
                {item.name}
              </Button>
            ))}
            {workspaceId && userInfo && (
              <CreateRoom creator={userInfo.name} room_type="CHANNEL" workspace_id={workspaceId} />
            )}
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
                variant={item.room_id === roomId ? 'secondary' : 'ghost'}
                className="w-full h-8 gap-x-2 justify-start p-0 pl-3"
                onClick={() => {
                  setShowThread(false);
                  setRoomId(item.room_id);
                  if (workspaceId) setLastInfo({ workspaceId, roomId: item.room_id });
                }}
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
                variant={item.room_id === roomId ? 'secondary' : 'ghost'}
                className="w-full h-8 gap-x-2 justify-start p-0 pl-3"
                onClick={() => {
                  setShowThread(false);
                  setRoomId(item.room_id);
                  if (workspaceId) setLastInfo({ workspaceId, roomId: item.room_id });
                }}
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
