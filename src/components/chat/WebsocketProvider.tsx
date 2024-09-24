"use client";

import { ReactNode, createContext, useMemo, useState } from "react";
import useWebSocket, { Options } from "react-use-websocket";
import { getCookie } from "cookies-next";
import { WEB_SOCKET_URL } from "@/env";

export type Message = {
  connectionId?: string;
  message: string;
  requestId?: string;
  userInfoId?: string;
  threadId?: string;
  timestamp?: number;
  isFinal: boolean;
  messageId?: number;
};

export interface WebSocketParam {
  userInfoId: string;
  threadId: string;
  message: string;
  messageId?: number;
}
export interface WebSocketContextType {
  connect: () => void;
  sendMessage: (param: WebSocketParam) => Promise<void>;
  disconnect: () => void;
  connectivity: boolean;
  incommingMessage: Message;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null
);

interface Props {
  children: ReactNode;
  options?: Options;
}

export default function WebSocketProvider({ children, options = {} }: Props) {
  const [connectivity, setConnectivity] = useState(false);
  const protocols = ["Authorization", getCookie("access_token") as string];
  console.log("websocket!!", `${WEB_SOCKET_URL}/chat-server/ws`);
  const socket = useWebSocket<Message>(
    `${WEB_SOCKET_URL}/chat-server/ws?token=${getCookie("access_token")}`,
    {
      ...options,
      shouldReconnect: () => true,
      protocols,
      onOpen: () => {
        console.log("socket open!!");
      },
    },
    connectivity
  );

  const value = useMemo<WebSocketContextType>(
    () => ({
      connect() {
        console.log("connect!!!");
        setConnectivity(true);
        socket.sendJsonMessage({ action: "$connect" });
      },
      async sendMessage(param: WebSocketParam) {
        socket.sendJsonMessage({ action: "sendMessage", ...param });
      },
      disconnect() {
        setConnectivity(false);
        socket.sendJsonMessage({ action: "$disconnect" });
      },
      get connectivity() {
        return connectivity;
      },
      get incommingMessage() {
        return socket.lastJsonMessage;
      },
    }),
    [socket, connectivity]
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}
