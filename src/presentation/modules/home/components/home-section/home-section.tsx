
import { Button } from "@/presentation/external/components/ui/button";
import { Calendar, TrendingUp, Users } from "lucide-react";
import { Progress } from "@/presentation/external/components/ui/progress";
import { UserGatewayHttp } from "@/infra/modules/user/user-gateway-http";
import { Card, CardContent } from "@/presentation/external/components/ui/card";

import Link from "next/link";
import { WelcomeBanner } from "../welcome-banner";
import { EnrollmentOverview } from "../enrollment-overview";
import { HttpClientFactory } from "@/infra/external/http/axios/http-client-factory";
import { Suspense } from "react";
import { Skeleton } from "@/presentation/shared/layout/components/skeleton/skeleton";
import { HighlightMentors } from "../highlight-mentors";

export const edicts = [
  {
    id: 1,
    title: "Programa de Aceleração Tech 2024",
    description: "Venha participar desse programa para startups inovadoras",
    category: "Tecnologia",
    icon: "💡",
    status: "Inscrito",
    statusColor: "bg-green-500 text-white",
    startDate: new Date(),
    endDate: new Date(),
    enrolled: true,
  },
  {
    id: 2,
    title: "Programa de Aceleração Tech 2024",
    description: "Venha participar desse programa para startups inovadoras",
    category: "Tecnologia",
    icon: "💡",
    status: "Inscrito",
    statusColor: "bg-green-500 text-white",
    startDate: new Date(),
    endDate: new Date(),
    enrolled: true,
  },
  {
    id: 3,
    title: "Programa de Aceleração Tech 2024",
    description: "Venha participar desse programa exclusivo",
    category: "Tecnologia",
    icon: "🎯",
    status: "Aberto",
    statusColor: "bg-[#F4DA02] text-white",
    startDate: new Date(),
    endDate: new Date(),
    enrolled: false,
  },
  {
    id: 4,
    title: "Exemplo",
    description: "Descrição de exemplo para demonstração",
    category: "Exemplo",
    icon: "📋",
    status: "",
    statusColor: "bg-gray-400",
    startDate: new Date(),
    endDate: new Date(),
    enrolled: false,
  },
]


export async function HomeSection() {
  const client = HttpClientFactory.create()
  const userGatewayHttp = new UserGatewayHttp(client)

  const user = await userGatewayHttp.get()


  const firstName = user?.name.split(" ")[0]
  const role = user?.role


  return (
    <div className="min-h-screen">
      {/* <HomeSideBar role={role} /> */}
      {/* <Header profile={<Profile {...user} />} /> */}

      <section className="p-6 space-y-8">


        <WelcomeBanner name={String(firstName)} />

        <div className="grid gap-6  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5127FF]/5 to-[#5127FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Sua Jornada</h3>
                  <p className="text-sm text-gray-600">Pré-aceleração</p>
                </div>
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Progresso</span>
                    <span className="text-[#5127FF]">2 de 3</span>
                  </div>
                  <Progress value={66} className="h-3 bg-gray-200" />
                  <p className="text-xs text-gray-600 text-center">Continue evoluindo!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F4DA02]/5 to-[#F4DA02]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative ">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#F4DA02] to-[#F4DA02]/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Próximas Atividades</h3>
                  <p className="text-sm text-gray-600">Sua agenda</p>
                </div>
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 bg-[#5127FF] rounded-full flex-shrink-0"></div>
                    <span className="font-medium">Mentoria com Ana Silva</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 bg-[#F4DA02] rounded-full flex-shrink-0"></div>
                    <span className="font-medium">Workshop de Pitch</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-green-500/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Comunidade</h3>
                  <p className="text-sm text-gray-600">Rede ativa</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                  <p className="text-3xl font-bold text-gray-900 mb-2">1,247</p>
                  <p className="text-sm text-gray-600">Empreendedores conectados</p>
                  <div className="mt-3 flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Online agora</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-gray-900">Editais</h2>
              <p className="text-gray-600">Editais em que você está inscrito.</p>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white transition-all duration-300 font-semibold px-6"
            >
              Ver Todos
            </Button>
          </div>
          <Suspense
            fallback={<Skeleton.EnrollmentOverviewSkeleton />}
          >
            <EnrollmentOverview />
          </Suspense>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">Mentores em Destaque</h2>
              <p className="text-gray-600">Conecte-se com especialistas que vão acelerar sua jornada</p>
            </div>
            <Link href="/mentores">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white transition-all duration-300 font-semibold px-6"
              >
                Ver Todos os Mentores
              </Button>
            </Link>

          </div>

          <Suspense fallback={<Skeleton.HighlightMentorsSkeleton />}>
            <HighlightMentors />
          </Suspense>

          <div className="mt-8 p-8 bg-gradient-to-r from-[#5127FF]/10 to-[#F4DA02]/10 rounded-2xl border border-[#5127FF]/20 shadow-sm">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Não encontrou o mentor ideal?</h3>
              <p className="text-gray-600 text-lg">Temos mais de 50+ mentores especialistas esperando para ajudar você</p>

              <Link href="/mentores">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/90 hover:from-[#5127FF]/90 hover:to-[#5127FF] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Explorar Todos os Mentores
                </Button>
              </Link>

            </div>
          </div>
        </div>
      </section>

      <footer className="mt-12 p-6 bg-white border-t">
        <div className="text-center text-sm text-gray-600">
          <p>© 2025 Kadoo - Acelerando startups para transformar vidas</p>
          <p className="mt-1">Uma iniciativa para democratizar o empreendedorismo</p>
        </div>
      </footer>
    </div>
  );
}