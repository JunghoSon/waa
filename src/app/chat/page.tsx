'use client';

import Link from 'next/link';
import { CircleUser, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/Icon';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ToggleBlock, ToggleBlockContent, ToggleBlockTrigger } from '@/components/common/ToggleBlock';
import Editor from '@/components/chat/Editor';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Workspaces from '@/components/chat/Workspaces';
import Rooms from '@/components/chat/Rooms';
import Messages from '@/components/chat/Messages';
import useMembership from '@/hooks/api/useMembership';
import Lnb from '@/components/common/Lnb';
import UserInfo from '@/components/common/UserInfo';
import { useEffect, useRef, useState } from 'react';
import { useThreadStore } from '@/store/thread';
import Thread from '@/components/common/Thread';
import RoomInfo from '@/components/chat/RoomInfo';

interface SocketMessage {
  data: {
    content: string;
    created_at: string;
    data: {
      emoji_count: number;
      emojis: null;
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
  };
  room_id: string;
  sender_id: string;
  sub_type: string;
  type: string;
  workspace_id: string;
}

export default function Chat() {
  useMembership();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState<number>(0);
  const initRef = useRef<boolean>(false);

  const showTread = useThreadStore((state) => state.showThread);

  useEffect(() => {
    if (!initRef.current && scrollContainerRef.current) {
      initRef.current = true;
      setH(scrollContainerRef.current?.clientHeight - 112);
    }
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              {/* <Package2 className="h-6 w-6" /> */}
              <span className="">WAA</span>
            </Link>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1">
            <Lnb />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
          </Sheet>

          <UserInfo />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Chat</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <ResizablePanelGroup direction="horizontal" className="flex-1 border rounded-md">
            <ResizablePanel className="min-w-48" id="sidebar" minSize={15} order={1}>
              <div className="px-4">
                <Workspaces />

                <Rooms />

                <ToggleBlock className="mt-3">
                  <ToggleBlockTrigger>조직도</ToggleBlockTrigger>
                  <ToggleBlockContent className="mt-2">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="py-2">CTO</AccordionTrigger>
                        <AccordionContent className="pl-3">
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="border-none">
                              <AccordionTrigger className="py-2">
                                <div className="flex items-center gap-x-2">
                                  <Icon name="CornerDownRight" size={18} />
                                  <span>Platform개발그룹</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pl-3">
                                <Accordion type="single" collapsible className="w-full">
                                  <AccordionItem value="item-1" className="border-none">
                                    <AccordionTrigger className="py-2">
                                      <div className="flex items-center gap-x-2">
                                        <Icon name="CornerDownRight" size={18} />
                                        <span>OCB개발팀</span>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-6 pb-0">
                                      <Button variant="ghost" className="w-full h-8 gap-x-2 justify-start p-0">
                                        <Avatar className="w-6 h-6 rounded-lg">
                                          <AvatarImage src="/static/images/member.png" alt="" />
                                          <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        개발자
                                      </Button>
                                    </AccordionContent>
                                  </AccordionItem>
                                  <AccordionItem value="item-2" className="border-none">
                                    <AccordionTrigger className="py-2">
                                      <div className="flex items-center gap-x-2">
                                        <Icon name="CornerDownRight" size={18} />
                                        <span>Syrup개발팀</span>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-6 pb-0">
                                      <Button variant="ghost" className="w-full h-8 gap-x-2 justify-start p-0">
                                        <Avatar className="w-6 h-6 rounded-lg">
                                          <AvatarImage src="/static/images/member.png" alt="" />
                                          <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        개발자
                                      </Button>
                                    </AccordionContent>
                                  </AccordionItem>
                                  <AccordionItem value="item-3" className="border-none">
                                    <AccordionTrigger className="py-2">
                                      <div className="flex items-center gap-x-2">
                                        <Icon name="CornerDownRight" size={18} />
                                        <span>ES서비스개발팀</span>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-6 pb-0">
                                      <Button variant="ghost" className="w-full h-8 gap-x-2 justify-start p-0">
                                        <Avatar className="w-6 h-6 rounded-lg">
                                          <AvatarImage src="/static/images/member.png" alt="" />
                                          <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        개발자
                                      </Button>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </ToggleBlockContent>
                </ToggleBlock>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel id="message" defaultSize={85} order={2}>
              <div className="flex items-center h-12 border-b">
                <RoomInfo />
              </div>

              <div className="w-full h-[calc(100%-48px)]" ref={scrollContainerRef}>
                <Messages h={h} />

                <div className="w-full h-28 px-4 pb-4 box-border">
                  <Editor />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {showTread && <Thread />}
          </ResizablePanelGroup>
        </main>
      </div>
    </div>
  );
}
