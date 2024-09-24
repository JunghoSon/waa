import Link from "next/link";
import Icon from "../ui/Icon";
import { Badge } from "../ui/badge";

export default function Lnb() {
  return (
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
        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
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
  );
}
