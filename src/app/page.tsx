import Link from "next/link";
import {
  Activity,
  Bell,
  CircleUser,
  CreditCard,
  DollarSign,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Icon from "@/components/ui/Icon";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
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
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Icon name="MonitorCheck" size={16} />
                My Desk
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                {/* <ShoppingCart className="h-4 w-4" /> */}
                <Icon name="Network" size={16} />
                Organization
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Icon name="FolderKanban" size={16} />
                Project{" "}
              </Link>
              <Link
                href="/chat"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Icon name="MessageSquareText" size={16} />
                Chat
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  20
                </Badge>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Icon name="Mail" size={16} />
                Email
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  7
                </Badge>
              </Link>
            </nav>
          </div>
          {/* <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Icon name="MonitorCheck" size={16} />
                  My Desk
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Network" size={16} />
                  Organization
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <Icon name="FolderKanban" size={16} />
                  Project{" "}
                </Link>
                <Link
                  href="/chat"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="MessageSquareText" size={16} />
                  Chat
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    20
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Mail" size={16} />
                  Email
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    7
                  </Badge>
                </Link>
              </nav>
              {/* <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div> */}
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <div className="flex space-x-2 items-center">
              <span>손정호</span>
              <Separator orientation="vertical" className="h-3" />
              <div className="flex items-center gap-x-1">
                <span className="py-1 px-2 rounded-sm inline-block mr-1 bg-primary text-primary-foreground text-xs">
                  근무중
                </span>
                <span className="text-sm">8:00 ~ 20:00</span>
              </div>
            </div>
            {/* <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form> */}
          </div>
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
          {/* <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
          </div> */}
          <div className="p-5 bg-muted/40 rounded-lg border">
            <h2 className="pb-3">My Desk</h2>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">노트</CardTitle>
                  <div className="flex gap-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-auto h-7 w-7 rounded-2xl"
                    >
                      <Icon name="Mic" size={16} />
                      <span className="sr-only">말하기</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-auto h-7 w-7 rounded-2xl"
                    >
                      <Icon name="FilePlus2" size={16} />
                      <span className="sr-only">추가</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-4 flex flex-col gap-y-1 mt-2">
                    <li>
                      <span className="block truncate">
                        waa 메인 페이지 개발
                      </span>
                    </li>
                    <li>
                      <span className="block truncate">matrix 공부</span>
                    </li>
                    <li>
                      <span className="block truncate">blah blah blah</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    일정 (오늘 3, 이번주 4)
                  </CardTitle>
                  <div className="flex gap-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-auto h-7 w-7 rounded-2xl"
                    >
                      <Icon name="FilePlus2" size={16} />
                      <span className="sr-only">추가</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-4 flex flex-col gap-y-1 mt-2">
                    <li>
                      <span className="block truncate">
                        [회의실: 508호] 오늘 오후 3시, WAA 컨셉 회의
                      </span>
                    </li>
                    <li>
                      <span className="block truncate">blah blah blah</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">할일</CardTitle>
                  <div className="flex gap-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-auto h-7 w-7 rounded-2xl"
                    >
                      <Icon name="FilePlus2" size={16} />
                      <span className="sr-only">추가</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-4 flex flex-col gap-y-1 mt-2">
                    <li>
                      <span className="block truncate">
                        mySUNI career 코드 리팩토링
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="p-5 rounded-lg border">
            <h2 className="pb-3">My Workspace</h2>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex h-5 items-center space-x-2 text-sm">
                      <div>Team</div>
                      <Separator orientation="vertical" />
                      <button className="flex items-center gap-x-1">
                        안 읽은 메세지 <Icon name="ChevronRight" size={16} />
                      </button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-4 flex flex-col gap-y-1 mt-2">
                    <li>
                      <span className="px-1 rounded-sm inline-block mr-1 bg-primary text-primary-foreground text-xs">
                        요약봇
                      </span>
                      안 읽은 메시지를 짧은 1_2줄로 요약 합니다.
                    </li>
                    <li>
                      <span className="px-1 border rounded-sm inline-block mr-1 text-xs">
                        양진걸
                      </span>
                      새로 올라온 메세지
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex h-5 items-center space-x-2 text-sm">
                      <div>Project</div>
                      <Separator orientation="vertical" />
                      <button className="flex items-center gap-x-1">
                        안 읽은 메세지 <Icon name="ChevronRight" size={16} />
                      </button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-4 flex flex-col gap-y-1 mt-2">
                    <li>
                      <span className="px-1 rounded-sm inline-block mr-1 bg-primary text-primary-foreground text-xs">
                        요약봇
                      </span>
                      안 읽은 메시지를 짧은 1_2줄로 요약 합니다.
                    </li>
                    <li>
                      <span className="px-1 border rounded-sm inline-block mr-1 text-xs">
                        유창현
                      </span>
                      새로 올라온 메세지
                    </li>
                    <li>
                      <span className="px-1 border rounded-sm inline-block mr-1 text-xs">
                        이보람
                      </span>
                      새로 올라온 메세지
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex items-center gap-x-1">
                      <Icon name="ListTree" size={16} />
                      Thread
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-4 flex flex-col gap-y-1 mt-2">
                    <li>
                      <div className="flex justify-between items-center">
                        <span>
                          <span className="px-1 border rounded-sm inline-block mr-1 text-xs">
                            양진걸
                          </span>
                          새로 올라온 댓글
                        </span>
                        <span className="text-xs">2시간전</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    @ 나를 멘션
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-4 flex flex-col gap-y-1 mt-2">
                    <li>
                      <div className="flex justify-between items-center">
                        <span>
                          <span className="px-1 border rounded-sm inline-block mr-1 text-xs">
                            양중철
                          </span>
                          나를 멘션한 메세지
                        </span>
                        <span className="text-xs">10분전</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="p-5 rounded-lg border">
            <h2 className="pb-3">Notification</h2>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex h-5 items-center space-x-2 text-sm">
                      <div>메일</div>
                      <Separator orientation="vertical" />
                      <button className="flex items-center gap-x-1">
                        3 <Icon name="ChevronRight" size={16} />
                      </button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-4 flex flex-col gap-y-1 mt-2">
                    <li>
                      <div className="flex justify-between items-center">
                        <span>
                          <span className="px-1 border rounded-sm inline-block mr-1 text-xs">
                            양진걸
                          </span>
                          새 매일 택스트
                        </span>
                        <span className="text-xs">2시간전</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex h-5 items-center space-x-2 text-sm">
                      <div>Jira</div>
                      <Separator orientation="vertical" />
                      <button className="flex items-center gap-x-1">
                        나의 이슈 <Icon name="ChevronRight" size={16} />
                      </button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-4 flex flex-col gap-y-1 mt-2">
                    <li>
                      <div>
                        <span className="px-1 border rounded-sm inline-block mr-1 text-xs">
                          SUNICAREER-9000
                        </span>
                        <span className="after:block after:clear-both after:content-['']">
                          업데이트 [QA] 검증 테스트 체크리스트{" "}
                          <span className="float-right text-xs">(2시간전)</span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex h-5 items-center space-x-2 text-sm">
                      <div>Wiki</div>
                      <Separator orientation="vertical" />
                      <span>최신활동</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-4 flex flex-col gap-y-1 mt-2">
                    <li>
                      <div className="flex justify-between items-center">
                        <span>
                          <span className="px-1 border rounded-sm inline-block mr-1 text-xs">
                            양진걸
                          </span>
                          2. career api 업데이트
                        </span>
                        <span className="text-xs">2시간전</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex h-5 items-center space-x-2 text-sm">
                      <div>Pnet</div>
                      <Separator orientation="vertical" />
                      <span>중요공지</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-4 flex flex-col gap-y-1 mt-2">
                    <li>
                      <div className="flex justify-between items-center">
                        <span>
                          <span className="px-1 rounded-sm inline-block mr-1 bg-primary text-primary-foreground text-xs">
                            공지
                          </span>
                          연봉협상 3분기 이후에 함
                        </span>
                        <span className="text-xs">10분전</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
