'use client'

import { loginGatewayHttp } from "@/infra/modules/login/login-gateway-http";
import { userGatewayHttp } from "@/infra/modules/user/user-gateway-http";
import { Button } from "@/presentation/external/components/ui/button";
import { Card, CardContent } from "@/presentation/external/components/ui/card";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/presentation/external/components/ui/sidebar";
import { EnumProfile } from "@/presentation/shared/layout/components/profile/profile";
import { APP_ROUTES } from "@/shared/constants/routes";
import { Avatar, AvatarImage, AvatarFallback } from "@/presentation/external/components/ui/avatar";
import { Home, FileText, UsersIcon, BarChart3, LogOut, UserRoundCog, Calendar, Settings } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";


import {
  ResponsiveContainer, Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip, PieChart as RPieChart,
  Pie,
  Cell,
  BarChart
} from "recharts";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/presentation/external/components/ui/chart";
import Link from "next/link";
import { edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http";

const menuItems = [
  { title: "Home", icon: Home, url: APP_ROUTES.home },
  { title: "Meus editais", icon: FileText, url: "/meus-editais" },
  { title: "Mentores", icon: UsersIcon, url: "/mentores" },
  { title: "Meu progresso", icon: BarChart3, url: "#" },
  { title: "Área do Administrador", icon: UserRoundCog, url: "/adm", onAdmin: true },
  { title: "Usuários", icon: Settings, url: "/adm/gerenciar-usuarios", onAdmin: true }
]


const mentorAreas = [
  { area: "Produto", value: 32, color: "#5127FF" },
  { area: "Marketing", value: 21, color: "#F4DA02" },
  { area: "Tech", value: 27, color: "#10B981" },
  { area: "Finanças", value: 14, color: "#F97316" },
  { area: "Jurídico", value: 9, color: "#EF4444" },
]

type PendingMentor = {
  id: number; name: string; area: string; years: number; tags: string[]; avatar?: string; profileUrl?: string
}
const initialPendingMentors: PendingMentor[] = [
  { id: 101, name: "Ana Silva", area: "Marketing", years: 8, tags: ["Growth", "Branding"], profileUrl: "/mentores/101" },
  { id: 102, name: "Bruno Santos", area: "Tech", years: 10, tags: ["Arquitetura", "DevOps"], profileUrl: "/mentores/102" },
  { id: 103, name: "Mariana Costa", area: "Produto", years: 6, tags: ["Discovery", "Métricas"], profileUrl: "/mentores/103" },
]


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "blue",
  },
  mobile: {
    label: "Mobile",
    color: "orange",
  },
} satisfies ChartConfig


const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]


function ApplicantsBarChart() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Inscrições x Aprovações (últimos 6 meses)</h3>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical horizontal />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent className="bg-black text-white" />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="blue" radius={4} />
          <Bar dataKey="mobile" fill="orange" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

function MentorAreasPieChart() {
  const total = mentorAreas.reduce((acc, cur) => acc + cur.value, 0)
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Áreas dos mentores</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RPieChart>
            <Tooltip />
            <Pie
              data={mentorAreas}
              dataKey="value"
              nameKey="area"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={4}
            >
              {mentorAreas.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
          </RPieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-600 mt-2">Total de mentores: <span className="font-medium">{total}</span></p>
      <div className="mt-2 flex flex-wrap gap-2">
        {mentorAreas.map((m) => (
          <span key={m.area} className="inline-flex items-center gap-2 text-xs bg-gray-50 rounded-full px-2.5 py-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: m.color }} />
            {m.area} • {m.value}
          </span>
        ))}
      </div>
    </div>
  )
}

function PendingMentorsList() {

  const { push } = useRouter()

  const [mentors, setMentors] = useState<PendingMentor[]>(initialPendingMentors)

  async function approve(id: number) {
    setMentors((prev) => prev.filter((m) => m.id !== id))
  }

  async function reject(id: number) {
    setMentors((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Mentores pendentes de aprovação</h3>
      <div className="flex flex-col gap-3">
        {mentors.length === 0 && (
          <Card className="p-6 text-center text-sm text-gray-600">Nenhum mentor pendente 🎉</Card>
        )}
        {mentors.map((m) => (
          <Card key={m.id} className="p-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5127FF]/10 text-[#5127FF] flex items-center justify-center font-semibold">
                {m.name.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">{m.name}</p>
                <p className="text-xs text-gray-600">
                  {m.area} • {m.years} anos • {m.tags.join(" · ")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">

              <Button
                variant="outline"
                className="text-green-600 border-green-200 hover:bg-green-50"
                onClick={() => approve(m.id)}
              >
                Aprovar
              </Button>
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => reject(m.id)}
              >
                Reprovar
              </Button>
              <Button
                variant="ghost"
                className="text-[#5127FF] hover:opacity-80"
                onClick={() => push(`/avaliar-mentor/${m.id}`)}
              >
                Ver Perfil
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function AdminPage() {

  const [user, setUser] = useState<{ name: string, role: EnumProfile } | null>(null)
  const [edicts, setEdicts] = useState<{
    id: number
    status: string
    categories: string[]
    title: string
    description: string
    startDate: Date
    endDate: Date
  }[] | null>(null)

  const getUser = useCallback(async () => {
    await userGatewayHttp.get().then(setUser)
  }, [])

  const getAllEdicts = useCallback(async () => {
    await edictGatewayHttp.getAll().then(setEdicts)
  }, [])

  useEffect(() => {
    getUser()
    getAllEdicts()
  }, [getUser, getAllEdicts])


  const firstName = user?.name.split(" ")[0]


  return (
    <div className="bg-gray-50 min-h-screen">
      <SidebarProvider>

        <SidebarInset>
          <main className="p-6 space-y-8 min-h-screen">
            <Card className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Bem-vindo, {firstName}! 👋</h2>
                    <p className="text-xl text-white/90">Pronto para transformar sua ideia em realidade?</p>
                  </div>

                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2">
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-gray-900">Editais</h2>
                    <p className="text-gray-600">Vitrine dos editais mais recentes</p>
                  </div>

                  <Button asChild variant="outline" size="lg" className="border-2 border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white">
                    <Link href="/adm/editais">Ver todos</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {edicts?.length ? (edicts?.map((edict) => (
                    <Link key={edict.id} href={`/edital/${edict.id}`} className="group">
                      <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">


                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 rounded-xl flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{"★"}</span>
                            </div>
                          </div>

                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#5127FF] transition-colors">
                            {edict.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                            {edict.description}
                          </p>

                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mt-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-[#5127FF]" />
                              <span className="font-medium">{new Date(edict.startDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-gray-500">até</span>
                              <span className="font-medium">{new Date(edict.endDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))) : <span>Nenhum edital cadastrado</span>}
                </div>
              </section>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
              <Card className="bg-white shadow-sm lg:col-span-2 2xl:col-span-3">
                <CardContent className="p-4">
                  <ApplicantsBarChart />
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <MentorAreasPieChart />
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm lg:col-span-2 2xl:col-span-2">
                <CardContent className="p-4">
                  <PendingMentorsList />
                </CardContent>
              </Card>
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