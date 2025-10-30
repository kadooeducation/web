'use client'

import { Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { userGatewayHttp } from '@/infra/modules/user/user-gateway-http'
import { Card, CardContent } from '@/presentation/external/components/ui/card'
import {
  SidebarInset,
  SidebarProvider,
} from '@/presentation/external/components/ui/sidebar'
import type { ProfileEnum } from '@/business/domain/enum/enum-profile'

export type EditalStatus = 'inscrito' | 'em_analise' | 'aprovado' | 'reprovado'

export interface EditalItem {
  id: number
  titulo: string
  descricao: string
  categoria: string
  inicio: string
  termino: string
  status: EditalStatus
  inscrito?: boolean
}

const editcs = [
  {
    id: 1,
    title: 'Programa de Aceleração Tech 2024',
    shortDescription:
      'Venha participar desse programa para startups de tecnologia',
    startDate: '17/07/2025',
    endDate: '17/07/2025',
    category: 'Tecnologia',
  },
  {
    id: 2,
    title: 'Programa de Aceleração Tech 2024',
    shortDescription:
      'Venha participar desse programa para startups de tecnologia',
    startDate: '17/07/2025',
    endDate: '17/07/2025',
    category: 'Tecnologia',
  },
  {
    id: 3,
    title: 'Programa de Aceleração Tech 2024',
    shortDescription:
      'Venha participar desse programa para startups de tecnologia',
    startDate: '17/07/2025',
    endDate: '17/07/2025',
    category: 'Tecnologia',
  },
  {
    id: 4,
    title: 'Programa de Aceleração Tech 2024',
    shortDescription:
      'Venha participar desse programa para startups de tecnologia',
    startDate: '17/07/2025',
    endDate: '17/07/2025',
    category: 'Tecnologia',
  },
]

export default function MeusEditaisPage() {
  const [user, setUser] = useState<{ name: string; role: ProfileEnum } | null>(
    null,
  )
  const { push } = useRouter()

  const getUser = useCallback(async () => {
    await userGatewayHttp.get().then(setUser)
  }, [])

  useEffect(() => {
    getUser()
  }, [getUser])

  // if (!user) return <Loading />

  const _role = user?.role

  return (
    <SidebarProvider>
      {/* <HomeSideBar role={role} /> */}
      <SidebarInset>
        {/* <Header profile={<Profile {...user} />} /> */}
        <div className="bg-gray-50 min-h-screen">
          <main className="p-6 space-y-8 w-full min-h-screen">
            <h1 className="text-2xl font-bold text-gray-900">Meus Editais</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editcs.map((edict) => (
                <Card
                  className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white hover:cursor-pointer"
                  key={edict.id}
                  onClick={() => push(`/etapas-do-edital/${edict.id}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5127FF]/5 to-[#F4DA02]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            🚀
                          </span>
                        </div>
                        <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                          {edict.category}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#5127FF] transition-colors duration-300">
                          {edict.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {edict.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 bg-gray-100 rounded-xl px-4 py-3 group-hover:bg-white group-hover:shadow transition-all duration-300 justify-between">
                        <div className="flex flex-col items-start gap-2">
                          <Calendar className="w-4 h-4 text-[#5127FF]" />
                          <div className="flex flex-col leading-tight">
                            <span className="text-[11px] text-gray-500 uppercase tracking-wide">
                              Início
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {edict.startDate}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-start gap-2">
                          <Calendar className="w-4 h-4 text-[#5127FF]" />
                          <div className="flex flex-col leading-tight">
                            <span className="text-[11px] text-gray-500 uppercase tracking-wide">
                              Término
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {edict.endDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* <Card className="border-0 shadow-md bg-gradient-to-r from-[#5127FF]/10 to-[#F4DA02]/10 border-[#5127FF]/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quer encontrar novos editais?</h3>
                <p className="text-gray-600 text-lg mb-6">Descubra oportunidades alinhadas com seu negócio e inscreva-se em poucos cliques.</p>
                <Button size="lg" className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/90 hover:from-[#5127FF]/90 hover:to-[#5127FF] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  Explorar Editais
                </Button>
              </CardContent>
            </Card> */}
          </main>

          <footer className="mt-12 p-6 bg-white border-t">
            <div className="text-center text-sm text-gray-600 max-w-7xl mx-auto">
              <p>© 2025 Kadoo - Acelerando startups para transformar vidas</p>
              <p className="mt-1">
                Uma iniciativa para democratizar o empreendedorismo
              </p>
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
