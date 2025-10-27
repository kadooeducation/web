"use client"

import { loginGatewayHttp } from "@/infra/modules/login/login-gateway-http";
import { Avatar, AvatarFallback } from "@/presentation/external/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/presentation/external/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/presentation/external/components/ui/sidebar";
import { APP_ROUTES } from "@/shared/constants/routes";
import { User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarProps {
  initial: string
}

export function Navbar({ initial }: NavbarProps) {

  const { push } = useRouter()

  async function handleLogOut() {
    await loginGatewayHttp.logout().then(() => push(APP_ROUTES.login))
  }

  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 bg-background z-50 border-b">
      <div className="inline-flex gap-2 items-center">
        <SidebarTrigger />
        <Link href="/">Dashboard</Link>
      </div>
      <div className="flex items-center gap-4">
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="">
              <AvatarFallback className=" bg-[#5127FF] rounded-full text-sm text-white font-semibold uppercase">
                {initial}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-[1.2rem] w-[1.2rem] mr-2" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={handleLogOut}>
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}