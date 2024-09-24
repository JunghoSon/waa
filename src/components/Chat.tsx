"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/Icon";
import {
  ToggleBlock,
  ToggleBlockContent,
  ToggleBlockTrigger,
} from "@/components/common/ToggleBlock";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatItem from "@/components/chat/ChatItem";
import Editor from "@/components/chat/Editor";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
// http://10.202.20.237:8008/_matrix/static/
export default function Chat() {
  const [loggedIn, setLoggedIn] = useState(false);
  const login = async () => {
    await axios.post("http://localhost:7001/login");
    setLoggedIn(true);
  };

  const createRoom = async () => {
    const res = await axios.post("http://localhost:7001/createRoom");
    console.log("res: ", res);
  };

  const getRoomInfo = async () => {
    const res = await axios.get("http://localhost:7001/getRoom");
    console.log("res: ", res);
  };

  // react-draft-wysiwyg

  return (
    <div className="h-[calc(100vh-3.5rem)] flex pr-1 pb-1">
      <div className="flex-none w-20">
        <div className="flex flex-col items-center gap-y-3 py-2">
          <Avatar className="w-10 h-10 rounded-lg border">
            <AvatarImage src="/static/images/korea.png" alt="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar
            className="w-10 h-10 rounded-lg items-center justify-center border bg-none"
            onClick={() => console.log("clicked!!")}
          >
            <AvatarFallback className="rounded-none">+</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 border rounded-md"
      >
        <ResizablePanel className="min-w-48" defaultSize={15}>
          <div className="flex h-12 items-center justify-between px-4 border-b">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                국가대표축구팀 <Icon name="ChevronDown" size={15} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="flex items-center gap-x-2">
                  <Avatar className="w-8 h-8 rounded-lg border">
                    <AvatarImage src="/static/images/korea.png" alt="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="text-md">국가대표축구팀</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>초대</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>모바일에서 로그인하기</DropdownMenuItem>
                <DropdownMenuItem>로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col gap-y-1 p-4">
            <Button
              variant="ghost"
              className="w-full h-8 gap-x-2 justify-start p-0"
            >
              <Icon name="Mail" size={15} />
              이메일
            </Button>
            <Button
              variant="ghost"
              className="w-full h-8 gap-x-2 justify-start p-0"
            >
              <Icon name="MessageSquareText" size={15} />
              채팅
            </Button>
            <Button
              variant="ghost"
              className="w-full h-8 gap-x-2 justify-start p-0"
            >
              <Icon name="Video" size={15} />
              영상통화
            </Button>

            <ToggleBlock className="mt-6">
              <ToggleBlockTrigger>wiki</ToggleBlockTrigger>
              <ToggleBlockContent>
                <Button
                  variant="ghost"
                  className="w-full h-8 gap-x-2 justify-start p-0"
                >
                  <Icon name="FolderKanban" size={15} />
                  project A
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-8 gap-x-2 justify-start p-0"
                >
                  <Icon name="FolderKanban" size={15} />
                  project B
                </Button>
              </ToggleBlockContent>
            </ToggleBlock>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="min-w-48" defaultSize={15}>
          <div className="flex h-12 items-center px-4 border-b gap-x-1">
            <Icon name="MessageSquareText" size={18} />
            채팅
          </div>
          <div className="px-4">
            <ToggleBlock className="mt-6">
              <ToggleBlockTrigger>채널</ToggleBlockTrigger>
              <ToggleBlockContent>
                <Button
                  variant="ghost"
                  className="w-full h-8 gap-x-2 justify-start p-0"
                >
                  <Icon name="Hash" size={15} />
                  away
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-8 gap-x-2 justify-start p-0"
                >
                  <Icon name="Hash" size={15} />
                  general
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-8 gap-x-2 justify-start p-0"
                >
                  <Icon name="Hash" size={15} />
                  away
                </Button>
              </ToggleBlockContent>
            </ToggleBlock>

            <ToggleBlock className="mt-3">
              <ToggleBlockTrigger>다이렉트 메세지</ToggleBlockTrigger>
              <ToggleBlockContent className="mt-2">
                <Button
                  variant="ghost"
                  className="w-full h-8 gap-x-2 justify-start p-0"
                >
                  <Avatar className="w-6 h-6 rounded-lg">
                    <AvatarImage src="/static/images/son.png" alt="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  쏘니
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-8 gap-x-2 justify-start p-0"
                >
                  <Avatar className="w-6 h-6 rounded-lg">
                    <AvatarImage src="/static/images/yong.png" alt="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  k1 MVP
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-8 gap-x-2 justify-start p-0"
                >
                  <Avatar className="w-6 h-6 rounded-lg">
                    <AvatarImage src="/static/images/cl.png" alt="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  재택스만
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-8 gap-x-2 justify-start p-0"
                >
                  <Avatar className="w-6 h-6 rounded-lg">
                    <AvatarImage src="/static/images/kang.png" alt="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  탁구왕
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-8 gap-x-2 justify-start p-0"
                >
                  <Avatar className="w-6 h-6 rounded-lg">
                    <AvatarImage src="/static/images/korea.png" alt="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  협회
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-8 gap-x-2 justify-start p-0"
                >
                  <Avatar className="w-6 h-6 rounded-lg">
                    <AvatarImage src="/static/images/mong.png" alt="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  몽큐
                </Button>
              </ToggleBlockContent>
            </ToggleBlock>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={45}>
          <div className="flex items-center h-12 border-b">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center hover:bg-none"
                >
                  general <Icon name="ChevronDown" size={15} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>general</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    {/* <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Pedro Duarte"
                      className="col-span-3"
                    /> */}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    {/* <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                    /> */}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full h-[calc(100%-3rem)]">
            <ScrollArea className="w-full h-[calc(100%-7rem)] pt-4 box-border">
              <div className="flex flex-col gap-y-3">
                <ChatItem
                  message="클리스만 어디야"
                  name="몽큐"
                  time="오후 1:21"
                  thumbnail="/static/images/mong.png"
                />
                <ChatItem
                  message="미쿡 집이야"
                  name="재택스만"
                  time="오후 1:21"
                  thumbnail="/static/images/cl.png"
                />
                <ChatItem
                  message="..."
                  name="협회"
                  time="오후 1:21"
                  thumbnail="/static/images/korea.png"
                />
                <div className="my-3">
                  <Separator />
                  <div className="flex justify-center -mt-3">
                    <Badge
                      variant="outline"
                      className="text-gray-400 bg-white gap-x-1"
                    >
                      오늘 <Icon name="ChevronDown" size={12} />
                    </Badge>
                  </div>
                </div>
                <ChatItem
                  message="강인아 탁구 치지마라"
                  name="쏘니"
                  time="오후 1:21"
                  thumbnail="/static/images/son.png"
                />
                <ChatItem
                  message="싫은데???"
                  name="탁구왕"
                  time="오후 1:21"
                  thumbnail="/static/images/kang.png"
                />
                <ChatItem
                  message="너 이자식 선배한테 말이 그게 뭐야 이리 안와?!"
                  name="k1 MVP"
                  time="오후 1:21"
                  thumbnail="/static/images/yong.png"
                />
                <ChatItem
                  message="좋은 방향으로 가고 있어 :D"
                  name="재택스만"
                  time="오후 1:21"
                  thumbnail="/static/images/cl.png"
                />
              </div>
            </ScrollArea>
            <div className="w-full h-28 px-4 pb-4 box-border">
              <Editor />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="min-w-48" defaultSize={15}>
          <div className="flex items-center justify-between h-12 px-4 border-b">
            <span>스레드</span>
            <Button variant="ghost" size="icon" className="w-6 h-6">
              <Icon name="X" />
            </Button>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* <div className="flex-none w-12 bg-slate-400">
        <h2>chat</h2>
        <div>
          <button onClick={login}>로그인</button>
        </div>
      </div>
      <div className="flex-1">
        <p>center</p>
        {loggedIn && (
          <div>
            <div>
              <button onClick={createRoom}>방생성</button>
            </div>
            <div>
              <button onClick={getRoomInfo}>방정보</button>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 bg-slate-400">
        <p>right</p>
        {loggedIn && (
          <div>
            <div>
              <button onClick={createRoom}>방생성</button>
            </div>
            <div>
              <button onClick={getRoomInfo}>방정보</button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}
