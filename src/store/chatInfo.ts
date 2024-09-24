import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type ChatInfoStore = {
  workspaceId?: string;
  roomId?: string;
};

export type ChatInfoActions = {
  actions: {
    setWorkspaceId: (id: string) => void;
    setRoomId: (id: string) => void;
  };
};

export const intialState: ChatInfoStore = {};

export const useChatInfoStore = create<ChatInfoStore & ChatInfoActions>()(
  devtools(
    persist(
      immer((set) => ({
        ...intialState,
        actions: {
          setRoomId: (id: string) => {
            set((state) => {
              state.roomId = id;
            });
          },
          setWorkspaceId: (id: string) => {
            set((state) => {
              state.workspaceId = id;
            });
          },
        },
      })),
      {
        name: "chat-info-store",
        partialize: (store) => ({
          workspaceId: store.workspaceId,
          roomId: store.roomId,
        }),
        version: 1,
      }
    )
  )
);

export const useChatInfoActions = () =>
  useChatInfoStore((store) => store.actions);
