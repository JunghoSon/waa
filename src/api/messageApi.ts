import { api } from "@/api/config";
import { AxiosPromise } from "axios";

export interface SendMessage {
  content: string;
  event_type:
    | "MESSAGE"
    | "INVITE"
    | "THREAD"
    | "REACTION"
    | "CREATE_ROOM"
    | "JOIN_ROOM"
    | "LEAVE_ROOM"
    | "TYPING"
    | "PRESENCE"
    | "ET";
  message_id?: number;
}

export const postMessage = ({
  workspaceId,
  roomId,
  message,
}: {
  workspaceId: string;
  roomId: string;
  message: SendMessage;
}): AxiosPromise<{ room_id: string }> =>
  api.post(
    `/room-api/workspaces/${workspaceId}/rooms/${roomId}/messages`,
    message
  );
