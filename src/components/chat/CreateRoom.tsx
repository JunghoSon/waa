'use client';

import { ChangeEvent, FormEventHandler, useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog';
import Icon from '../ui/Icon';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import useWorkspaceMembers from '@/hooks/api/useWorkspaceMembers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoom, ParamCreateRoom } from '@/api/roomApi';
import { useChatInfoActions } from '@/store/chatInfo';

interface Props {
  creator: string;
  is_private?: false;
  room_type: 'DM' | 'GROUP' | 'CHANNEL';
  workspace_id: string;
}

export default function CreateRoom({ creator, is_private = false, room_type, workspace_id }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [members, setMembers] = useState<Set<string>>(new Set());
  const { data } = useWorkspaceMembers(workspace_id);
  const { setRoomId, setLastInfo } = useChatInfoActions();
  const { mutateAsync } = useMutation({
    mutationFn: (param: ParamCreateRoom) => createRoom(param),
  });
  const queryClient = useQueryClient();
  const handleChange = (value: string) => {
    console.log(value);
    setMembers((prev) => {
      const newState = new Set(prev);

      if (newState.has(value)) {
        newState.delete(value);
      } else {
        newState.add(value);
      }

      return newState;
    });
  };
  const handleSubmit = async () => {
    if (!name) {
      alert('채널 이름을 입력해 주세요.');
      return;
    }

    try {
      const response = await mutateAsync({
        creator,
        is_private,
        name,
        room_type,
        workspace_id,
        invite_members: Array.from(members.values()),
      });

      queryClient.invalidateQueries({ queryKey: ['getRooms', workspace_id] });
      setRoomId(response.data.room_id);
      setLastInfo({ workspaceId: workspace_id, roomId: response.data.room_id });

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center hover:bg-none" size="sm">
          <Icon name="Plus" size={15} className="mr-2" />
          채널 만들기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>채널 만들기</DialogTitle>
          <DialogDescription>새로운 채널을 만들어 보아요!!</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-start items-center gap-5">
            <Label htmlFor="name">채널명</Label>
            <Input
              type="text"
              placeholder="채널명"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-300 grow"
            />
          </div>
          <div>
            <p className="text-sm font-medium">초대할 멤버</p>
            <div className="h-[150px] overflow-y-auto mt-2">
              <ul className="flex flex-col gap-2">
                {data?.map((item) => (
                  <li className="flex items-center gap-2" key={item.WorkspaceMemberID}>
                    <Checkbox
                      id={item.WorkspaceMemberID}
                      checked={members.has(item.WorkspaceMemberID)}
                      onClick={() => handleChange(item.WorkspaceMemberID)}
                    />
                    <label htmlFor={item.WorkspaceMemberID} className="text-sm font-medium grow">
                      {item.WorkspaceMemberID}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
