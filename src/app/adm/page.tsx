import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { kyClient } from '@/infra/external/http/ky-client/api'
import { Button } from '@/presentation/external/components/ui/button'
import { Card, CardContent } from '@/presentation/external/components/ui/card'
import {
  SidebarInset,
  SidebarProvider,
} from '@/presentation/external/components/ui/sidebar'
import { ApplicantsBarChart } from '@/presentation/modules/home/components/applicants-bar-chart'
import { MentorAreasPieChart } from '@/presentation/modules/home/components/mentors-areas-pie-chart'
import { PendingMentorsList } from '@/presentation/modules/home/components/pending-mentors-list'
import { formatDate } from '@/shared/functions/format-date'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const _user = await kyClient.get<{ acronym: string }>('me')

  const edicts =
    await kyClient.get<
      {
        id: number
        status: string
        categories: string[]
        title: string
        description: string
        startDate: Date
        endDate: Date
      }[]
    >('edict')

  return (
    <div className="bg-gray-50 min-h-screen">
      <SidebarProvider>
        <SidebarInset>
          <main className="p-6 space-y-8 min-h-screen">
            <div className="flex flex-col gap-2">
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Editais
                    </h2>
                    <p className="text-gray-600">
                      Vitrine dos editais mais recentes
                    </p>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white"
                  >
                    <Link href="/adm/editais">Ver todos</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {edicts?.length ? (
                    edicts?.map((edict) => (
                      <Link
                        key={edict.id}
                        href={`/edital/${edict.id}`}
                        className="group"
                      >
                        <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white lg:max-h-64">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                  {'★'}
                                </span>
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
                                <span className="font-medium">
                                  {formatDate(edict.startDate)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">até</span>
                                <span className="font-medium">
                                  {formatDate(edict.endDate)}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <span>Nenhum edital cadastrado</span>
                  )}
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
              <p className="mt-1">
                Uma iniciativa para democratizar o empreendedorismo
              </p>
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
