'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/presentation/external/components/ui/button'
import { Card } from '@/presentation/external/components/ui/card'

type PendingMentor = {
  id: number
  name: string
  area: string
  years: number
  tags: string[]
  avatar?: string
  profileUrl?: string
}
const initialPendingMentors: PendingMentor[] = [
  {
    id: 101,
    name: 'Ana Silva',
    area: 'Marketing',
    years: 8,
    tags: ['Growth', 'Branding'],
    profileUrl: '/mentores/101',
  },
  {
    id: 102,
    name: 'Bruno Santos',
    area: 'Tech',
    years: 10,
    tags: ['Arquitetura', 'DevOps'],
    profileUrl: '/mentores/102',
  },
  {
    id: 103,
    name: 'Mariana Costa',
    area: 'Produto',
    years: 6,
    tags: ['Discovery', 'Métricas'],
    profileUrl: '/mentores/103',
  },
]

export function PendingMentorsList() {
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
      <h3 className="text-lg font-semibold mb-4">
        Mentores pendentes de aprovação
      </h3>
      <div className="flex flex-col gap-3">
        {mentors.length === 0 && (
          <Card className="p-6 text-center text-sm text-gray-600">
            Nenhum mentor pendente 🎉
          </Card>
        )}
        {mentors.map((m) => (
          <Card
            key={m.id}
            className="p-4 flex items-start justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5127FF]/10 text-[#5127FF] flex items-center justify-center font-semibold">
                {m.name.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">{m.name}</p>
                <p className="text-xs text-gray-600">
                  {m.area} • {m.years} anos • {m.tags.join(' · ')}
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
