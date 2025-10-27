'use client'

import { APP_ROUTES } from "@/shared/constants/routes";
import { Home, FileText, UsersIcon, BarChart3, LogOut, UserRoundCog, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/presentation/external/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardDescription, CardHeader, CardTitle } from "@/presentation/external/components/ui/card";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginGatewayHttp } from "@/infra/modules/login/login-gateway-http";
import { edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http";
import { userGatewayHttp } from "@/infra/modules/user/user-gateway-http";
import { userEdictGatewayHttp } from "@/infra/modules/user-edict/user-edict-gateway-http";
import { toast } from "sonner";
import type { EnumProfile } from "@/presentation/shared/layout/components/profile/profile";

const menuItems = [
  { title: "Home", icon: Home, url: APP_ROUTES.home },
  { title: "Meus editais", icon: FileText, url: "/meus-editais" },
  { title: "Mentores", icon: UsersIcon, url: "/mentores" },
  { title: "Meu progresso", icon: BarChart3, url: "#" },
  { title: "Área do Administrador", icon: UserRoundCog, url: "/adm", onAdmin: true },
  { title: "Usuários", icon: Settings, url: "/adm/gerenciar-usuarios", onAdmin: true },
];

type User = { id: number; name: string; email: string };
type Edict = { id: number; title: string };

const schema = z.object({
  userId: z.string(),
  edictId: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function UsersEdictsPage() {
  const { push } = useRouter();

  const [allUsers, setAllUsers] = useState<{id: string, name: string, role: EnumProfile}[]>([]);
  const [edicts, setEdicts] = useState<Edict[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    (async () => {
      const [usersRes, edictsRes] = await Promise.all([
        userGatewayHttp.getAll(),
        edictGatewayHttp.getAll(),
      ]);
      setAllUsers(usersRes ?? []);
      setEdicts((edictsRes ?? []).map((e: any) => ({ id: e.id, title: e.title })));
    })();
  }, []);

  async function handleLogOut() {
    await loginGatewayHttp.logout();
    push(APP_ROUTES.login);
  }

  const onSubmit = async (data: FormValues) => {
    await userEdictGatewayHttp.create({
      userId: data.userId,
      edictId: data.edictId,
    })
      .then(() => {
        toast.success("Usuário atrelado com sucesso")
      })
      .catch(() => {
        toast.error("Usuário já está cadastrado nesse edital")
      });
    reset();
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Área do Administrador</h1>
            </div>
          </header>

          <main className="max-w-3xl px-4 py-10">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Atrelar usuário a um edital</h2>
              <p className="mt-1 text-sm text-neutral-600">Selecione o usuário e o edital e confirme abaixo.</p>
            </div>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-neutral-900">
                  Atrelar usuário
                </CardTitle>
                <CardDescription className="text-neutral-600">
                  Escolha as opções e confirme.
                </CardDescription>
              </CardHeader>

              <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                  <div className="grid gap-2">
                    <label htmlFor="userId" className="text-sm font-medium text-neutral-800">
                      Usuário *
                    </label>
                    <select
                      id="userId"
                      {...register("userId")}
                      defaultValue=""
                      className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#5127FF]"
                    >
                      <option value="" disabled>Selecione um usuário</option>
                      {allUsers.map((u) => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                      ))}
                    </select>
                    {errors.userId && (
                      <p className="text-xs text-red-600">{errors.userId.message}</p>
                    )}
                    <p className="text-xs text-neutral-500">Você pode trocar por Combobox para busca.</p>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="edictId" className="text-sm font-medium text-neutral-800">
                      Edital *
                    </label>
                    <select
                      id="edictId"
                      {...register("edictId")}
                      defaultValue=""
                      className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#5127FF]"
                    >
                      <option value="" disabled>Selecione um edital</option>
                      {edicts.map((e) => (
                        <option key={e.id} value={e.id}>{e.title}</option>
                      ))}
                    </select>
                    {errors.edictId && (
                      <p className="text-xs text-red-600">{errors.edictId.message}</p>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <Link
                      href="/adm/gerenciar-usuarios"
                      className="rounded-md border px-4 py-2 text-sm hover:bg-neutral-50"
                    >
                      Voltar
                    </Link>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium disabled:opacity-70"
                      style={{ backgroundColor: "#5127FF", color: "#fff" }}
                    >
                      {isSubmitting ? "Confirmando..." : "Confirmar"}
                    </button>
                  </div>
                </form>
              </div>
            </Card>
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
  );
}
