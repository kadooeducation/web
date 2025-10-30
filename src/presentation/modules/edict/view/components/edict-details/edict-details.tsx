'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Badge } from '@/presentation/external/components/ui/badge'
import { Button } from '@/presentation/external/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/presentation/external/components/ui/card'
import { Separator } from '@/presentation/external/components/ui/separator'

interface Edict {
  edict: {
    id: number
    status: string
    title: string
    description: string
    file: string
    startDate: Date
    organizer: string
    endDate: Date
    categories: string[]
  }
}

export function EdictDetailsSection({ edict }: Edict) {
  const { push } = useRouter()

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-8">
          <div>
            <Badge className="bg-[#5127FF] text-white px-3 py-1 rounded-full">
              Edital Aberto
            </Badge>
            <h1 className="text-4xl font-bold mt-4 text-[#5127FF]">
              {edict?.title}
            </h1>

            <div className="flex gap-2 mt-6">
              {edict?.categories?.map((category) => (
                <Badge key={category} className="bg-[#5127FF] text-white">
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="prose max-w-none whitespace-pre-line">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {edict?.description}
            </ReactMarkdown>
          </div>
        </div>

        <Card className="shadow-md rounded-2xl border border-[#e5e7eb] h-fit sticky top-12">
          <CardHeader>
            <CardTitle className="text-xl">Informações rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-semibold text-base">Período de Inscrição</h3>
              <span className="text-gray-500">
                {new Date(edict.startDate).toLocaleString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}{' '}
                à{' '}
                {new Date(edict.endDate).toLocaleString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <h3 className="font-semibold text-base">Organizador</h3>
              <span className="text-gray-500">{edict.organizer}</span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <h3 className="font-semibold text-base">Mais informações</h3>
              <a
                href={edict.file}
                className="text-[#5127FF] hover:underline"
                target="_blank"
              >
                Ver PDF do Edital
              </a>
            </div>

            <Separator />

            <Button
              className="w-full bg-[#F4DA02] hover:bg-[#e7cc01] text-black font-semibold transition-transform hover:scale-105"
              onClick={() => {
                push(`/etapas-do-edital/${edict.id}`)
              }}
            >
              Seguir para Etapas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
