import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";

enableMapSet();

export interface FrontMessage {
  content: string;
  created_at: string;
  sender_id: string;
  message_id: number;
}

export type MessageStore = {
  messages: Map<string, FrontMessage[]>;
};

export type MessagesActions = {
  actions: {
    initMessages: (messages: Map<string, FrontMessage[]>) => void;
    addMessage: (param: { key: string; message: FrontMessage }) => void;
  };
};

export const intialState: MessageStore = {
  messages: new Map(),
};

export const useMessageStore = create<MessageStore & MessagesActions>()(
  devtools(
    immer((set) => ({
      ...intialState,
      actions: {
        initMessages: (messages: Map<string, FrontMessage[]>) => {
          set((state) => {
            state.messages = messages;
          });
        },
        addMessage: ({
          key,
          message,
        }: {
          key: string;
          message: FrontMessage;
        }) => {
          set((state) => {
            const target = state.messages.get(key);

            if (target) {
              state.messages.set(key, [...target, message]);
            }
          });
        },
      },
    }))
  )
);

export const useMessagesActions = () =>
  useMessageStore((store) => store.actions);
