"use client";

import {
  BarChart3,
  FileText,
  Home,
  LogOut,
  UserRoundCog,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ProfileEnum } from "@/business/domain/enum/enum-profile";
import { loginGatewayHttp } from "@/infra/modules/login/login-gateway-http";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/presentation/external/components/ui/sidebar";
import { APP_ROUTES } from "@/shared/constants/routes";

interface HomeSideBarProps {
  role: ProfileEnum;
}

export function HomeSideBar({ role }: HomeSideBarProps) {
  const { push } = useRouter();

  const allMenuItems = [
    { title: "Home", icon: Home, url: APP_ROUTES.home },
    { title: "Meus editais", icon: FileText, url: "/meus-editais" },
    { title: "Mentores", icon: UsersIcon, url: "/mentores" },
    { title: "Meu progresso", icon: BarChart3, url: "#" },
    {
      title: "Área do Administrador",
      icon: UserRoundCog,
      url: "/adm",
      onAdmin: true,
    },
  ];

  const menuItems = allMenuItems.filter((item) => {
    if (!item.onAdmin) return true;
    return role === "ADMIN";
  });

  async function handleLogOut() {
    await loginGatewayHttp.logout().then(() => push(APP_ROUTES.login));
  }

  return (
    <Sidebar className="border-r-1 border-[#000]/10">
      <SidebarHeader className="p-6">
        <div className="flex justify-start items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={150}
            height={60}
            alt="Logo da Kadoo"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="data-[active=true]:bg-[#5127FF] data-[active=true]:text-white hover:bg-[#5127FF]/10"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="hover:bg-red-50 hover:text-red-600"
              onClick={handleLogOut}
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
