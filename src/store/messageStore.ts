import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { flatten } from "lodash-es";
import dayjs from "dayjs";

enableMapSet();

export interface FrontMessage {
  content: string;
  created_at: string;
  sender_id: string;
  message_id: string;
  thread_count?: number;
}

export type MessageStore = {
  messages: Map<string, FrontMessage[]>;
  addType?: "MESSAGE" | "THREAD";
};

export type MessagesActions = {
  actions: {
    initMessages: (messages: Map<string, FrontMessage[]>) => void;
    addMessage: (param: { key: string; message: FrontMessage }) => void;
    setAddType: (type: "MESSAGE" | "THREAD") => void;
    changeThreadCount: (messageId: string) => void;
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
        setAddType: (type: "MESSAGE" | "THREAD") => {
          set((state) => {
            state.addType = type;
          });
        },
        changeThreadCount: (messageId: string) => {
          set((state) => {
            const { messages } = state;
            const target = flatten(Array.from(messages.values())).find(
              (item) => item.message_id === messageId
            );

            if (target) {
              const { created_at } = target;
              const key = dayjs(created_at).format("YYYYMMDD");
              const list = state.messages.get(key) || [];

              const index = list.findIndex(
                (item) => item.message_id === messageId
              );

              if (index >= 0) {
                const message = list[index];

                state.messages.set(key, [
                  ...list.slice(0, index),
                  {
                    ...message,
                    thread_count: message.thread_count
                      ? message.thread_count + 1
                      : 1,
                  },
                  ...list.slice(index + 1),
                ]);
              }
            }
          });
        },
      },
    }))
  )
);

export const useMessagesActions = () =>
  useMessageStore((store) => store.actions);
