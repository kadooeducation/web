'use client'

import { APP_ROUTES } from "@/shared/constants/routes";
import { Home, FileText, UsersIcon, BarChart3, LogOut, UserRoundCog, Settings, ArrowRight, Link2, UserPlus } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/presentation/external/components/ui/sidebar";
import Image from 'next/image';
import { useState } from "react";
import { EnumProfile } from "@/presentation/shared/layout/components/profile/profile";
import { Card, CardDescription, CardHeader, CardTitle } from "@/presentation/external/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import { useRouter } from "next/navigation";
import { loginGatewayHttp } from "@/infra/modules/login/login-gateway-http";
import Link from 'next/link';

const menuItems = [
  { title: "Home", icon: Home, url: APP_ROUTES.home },
  { title: "Meus editais", icon: FileText, url: "/meus-editais" },
  { title: "Mentores", icon: UsersIcon, url: "/mentores" },
  { title: "Meu progresso", icon: BarChart3, url: "#" },
  { title: "Área do Administrador", icon: UserRoundCog, url: "/adm", onAdmin: true },
  { title: "Usuários", icon: Settings, url: "/adm/gerenciar-usuarios", onAdmin: true }
]

export default function ManagerUsersPage() {
  const { push } = useRouter()

  const [user] = useState<{ name: string, role: EnumProfile } | null>(null)



  const role = user?.role as keyof typeof ROLE_USER
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const ROLE_USER = {
    [EnumProfile.ROLE_STUDENT]: "Estudante",
    [EnumProfile.ROLE_MENTOR]: "Mentor",
    [EnumProfile.ROLE_ENTERPRISE]: "Empresa",
    [EnumProfile.ROLE_ADMIN]: "Administrador"
  } as const

  async function handleLogOut() {
    await loginGatewayHttp.logout().then(() => push(APP_ROUTES.login))
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <SidebarProvider>
        <Sidebar className="border-r-0">
          <SidebarHeader className="p-6">
            <div className="flex justify-start items-center gap-2">
              <Image src="/icons/logo.svg" width={150} height={60} alt="Logo da Kadoo" />
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
                <SidebarMenuButton className="hover:bg-red-50 hover:text-red-600" onClick={handleLogOut}>
                  <LogOut className="w-5 h-5" />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>


          <header className="flex items-center justify-between p-6 bg-white border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Área do Administrador</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-[#5127FF] text-white">{firstLetter}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-600">{ROLE_USER?.[role]}</p>
                </div>
              </div>
            </div>
          </header>


          <main className="max-w-3xl px-4 py-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <Link href="/adm/criar-usuario" className="group">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-neutral-900">
                      <span className="flex items-center gap-2"><UserPlus className="h-5 w-5" /> Criar usuário</span>
                      <ArrowRight className="h-4 w-4 opacity-60 transition-all group-hover:translate-x-0.5" />
                    </CardTitle>
                    <CardDescription className="text-neutral-600">Cadastrar um novo usuário na plataforma.</CardDescription>
                  </CardHeader>
                </Card>
              </Link>


              <Link href="/adm/usuario-edital" className="group">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-neutral-900">
                      <span className="flex items-center gap-2"><Link2 className="h-5 w-5" /> Atrelar usuário a um edital</span>
                      <ArrowRight className="h-4 w-4 opacity-60 transition-all group-hover:translate-x-0.5" />
                    </CardTitle>
                    <CardDescription className="text-neutral-600">Adicionar um usuário existente a um edital específico.</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </main>

          <footer className="mt-12 p-6 bg-white border-t">
            <div className="text-center text-sm text-gray-600">
              <p>© 2025 Kadoo - Acelerando startups para transformar vidas</p>
              <p className="mt-1">Uma iniciativa para democratizar o empreendedorismo</p>
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}