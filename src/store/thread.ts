import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";

enableMapSet();

export interface ThreadMessage {
  content: string;
  created_at: string;
  sender_id: string;
  message_id: string;
  message_thread_id: string;
}

export type ThreadStore = {
  showThread: boolean;
  workspaceId?: string;
  roomId?: string;
  messageId?: string;
  name?: string;
  time?: string;
  message?: string;
  thumbnail?: string;
  messages: ThreadMessage[];
};

export type ThreadActions = {
  actions: {
    setShowThread: (show: boolean) => void;
    setThreadInfo: (param: {
      workspaceId?: string;
      roomId?: string;
      messageId?: string;
      name?: string;
      time?: string;
      message?: string;
      thumbnail?: string;
    }) => void;
    initMessages: (messages: ThreadMessage[]) => void;
    addMessage: (message: ThreadMessage) => void;
  };
};

export const intialState: ThreadStore = {
  showThread: false,
  messages: [],
};

export const useThreadStore = create<ThreadStore & ThreadActions>()(
  devtools(
    immer((set) => ({
      ...intialState,
      actions: {
        setShowThread: (show: boolean) => {
          set((state) => {
            state.showThread = show;
          });
        },
        setThreadInfo: ({
          workspaceId,
          roomId,
          messageId,
          name,
          time,
          message,
          thumbnail,
        }: {
          workspaceId?: string;
          roomId?: string;
          messageId?: string;
          name?: string;
          time?: string;
          message?: string;
          thumbnail?: string;
        }) => {
          set((state) => {
            state.workspaceId = workspaceId as string;
            state.roomId = roomId as string;
            state.messageId = messageId as string;
            state.name = name as string;
            state.time = time as string;
            state.message = message as string;
            state.thumbnail = thumbnail as string;
          });
        },
        initMessages: (messages: ThreadMessage[]) => {
          set((state) => {
            state.messages = messages;
          });
        },
        addMessage: (message: ThreadMessage) => {
          set((state) => {
            if (state.messageId === message.message_id) {
              state.messages.push(message);
            }
          });
        },
      },
    }))
  )
);

export const useThreadActions = () => useThreadStore((store) => store.actions);
