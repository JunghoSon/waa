import { enableMapSet } from 'immer';
import { parse, stringify } from 'superjson';
import { create } from 'zustand';
import { devtools, persist, PersistStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

enableMapSet();

export type ChatInfoStore = {
  workspaceId?: string;
  roomId?: string;
  lastInfo: Map<string, string>;
};

export type ChatInfoActions = {
  actions: {
    setWorkspaceId: (id: string) => void;
    setRoomId: (id: string) => void;
    setLastInfo: (param: { workspaceId: string; roomId: string }) => void;
  };
};

export const intialState: ChatInfoStore = {
  lastInfo: new Map(),
};

const storage: PersistStorage<ChatInfoStore> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    if (!item) return null;
    return parse(item);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

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
          setLastInfo: ({ workspaceId, roomId }: { workspaceId: string; roomId: string }) => {
            set((state) => {
              console.log(state.lastInfo);
              state.lastInfo.set(workspaceId, roomId);
            });
          },
        },
      })),
      {
        name: 'chat-info-store',
        partialize: (store) => ({
          workspaceId: store.workspaceId,
          roomId: store.roomId,
          lastInfo: store.lastInfo,
        }),
        storage,
        version: 1.1,
      }
    )
  )
);

export const useChatInfoActions = () => useChatInfoStore((store) => store.actions);
