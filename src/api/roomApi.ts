import { api } from '@/api/config';
import { AxiosPromise } from 'axios';

export interface Workspace {
  creator: string;
  description: string;
  member_id: string;
  member_role: 'CREATOR' | 'ADMIN' | 'NORMAL';
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED';
  url: string;
  workspace_id: string;
}

export interface Room {
  created_at: number;
  created_by: string;
  data: {
    members: string[];
  };
  is_private: boolean;
  name: string;
  room_id: string;
  room_type: 'DM' | 'GROUP' | 'CHANNEL';
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED';
  workspace_id: string;
}

export interface Message {
  content: string;
  created_at: string;
  data: {
    emoji_count: number;
    emojis: {
      emoji: string;
      sender_id: string;
    }[];
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
}

export interface RoomMessage {
  end: number;
  hasMore: boolean;
  limit: number;
  messages: Message[];
  room_id: string;
  start: number;
}

export interface RoomMember {
  isBanned: boolean;
  memberID: string;
  role: 'CREATOR' | 'ADMIN' | 'NORMAL';
  roomID: string;
  roomMemberID: number;
  status: 'ACTIVE' | 'INACTIVATE' | 'DELETED';
}

export const getWorkspaces = (): AxiosPromise<Workspace[]> => api.get('/room-api/workspaces');

export const getRooms = (workspaceId: string): AxiosPromise<Room[]> =>
  api.get(`/room-api/workspaces/${workspaceId}/rooms`);

export const getRoomMessages = ({
  workspaceId,
  roomId,
}: {
  workspaceId: string;
  roomId: string;
}): AxiosPromise<RoomMessage> => api.get(`/room-api/workspaces/${workspaceId}/rooms/${roomId}/messages`);

export const getThreadMessages = ({
  workspaceId,
  roomId,
  messageId,
}: {
  workspaceId: string;
  roomId: string;
  messageId: string;
}): AxiosPromise<RoomMessage> =>
  api.get(`/room-api/workspaces/${workspaceId}/rooms/${roomId}/messages/${messageId}/threads`);

export const getRoomMembers = ({
  workspaceId,
  roomId,
}: {
  workspaceId: string;
  roomId: string;
}): AxiosPromise<RoomMember[]> => api.get(`/room-api/workspaces/${workspaceId}/rooms/${roomId}/members`);

export interface WorkspaceMember {
  WorkspaceID: string;
  WorkspaceMemberID: string;
  WorkspaceMemberRole: 'CREATOR' | 'ADMIN' | 'NORMAL';
}
export const getWorkspaceMembers = (workspaceId: string): AxiosPromise<WorkspaceMember[]> =>
  api.get(`/room-api/workspaces/${workspaceId}/members`);

export interface ParamCreateRoom {
  creator: string;
  dm_target?: string;
  invite_members?: string[];
  is_private: boolean;
  name: string;
  room_type: 'DM' | 'GROUP' | 'CHANNEL';
  workspace_id: string;
}

export const createRoom = (param: ParamCreateRoom): AxiosPromise<{ room_id: string }> =>
  api.post(`/room-api/workspaces/${param.workspace_id}/rooms`, param);
