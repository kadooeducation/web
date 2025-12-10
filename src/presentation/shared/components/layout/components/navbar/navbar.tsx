import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { auth } from "@/infra/external/http/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/external/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/presentation/external/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/presentation/external/components/ui/sidebar";

function getInitials(name: string): string {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return initials;
}

interface NavbarProps {
  title: string
}

export async function Navbar({ title }: NavbarProps) {
  const { user } = await auth();

  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 bg-background z-50 border-b">
      <div className="inline-flex gap-2 items-center">
        <SidebarTrigger />
        <Link href="/adm">{title}</Link>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>

            <Avatar>
              {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
              {user.name && (
                <AvatarFallback className=" bg-[#5127FF] rounded-full text-sm text-white font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <ChevronDown className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href="/api/auth/sign-out">
                <LogOut className="mr-2 size-4" />
                Sair
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
