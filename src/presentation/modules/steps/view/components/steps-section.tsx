'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Calendar,
  MapPin,
  Video,
  Info,
  BookOpen
} from 'lucide-react'

import { Card, CardContent } from '@/presentation/external/components/ui/card'
import { Badge } from '@/presentation/external/components/ui/badge'
import type { Step } from '@/infra/modules/step/step-gateway'

const DUO_GREEN_DARK = '#2B8A00'
const SOFT_SKY = '#E8F7FF'
const SOFT_MINT = '#EFFFF2'

function StatusPill({ status }: { status: Step['status'] }) {
  const variants = {
    concluida: {
      label: 'Concluída',
      className:
        'bg-[rgba(88,204,2,0.12)] text-[#2B8A00] ring-1 ring-[rgba(88,204,2,0.28)]'
    },
    em_andamento: {
      label: 'Em andamento',
      className:
        'bg-[rgba(255,212,59,0.18)] text-[#8A6A00] ring-1 ring-[rgba(255,212,59,0.35)]'
    },
    pendente: {
      label: 'Pendente',
      className:
        'bg-[rgba(0,0,0,0.05)] text-[#5B5B5B] ring-1 ring-[rgba(0,0,0,0.08)]'
    }
  } as const

  const key =
    (['concluida', 'em_andamento', 'pendente'] as const).find(s => s === status) ??
    'pendente'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${variants[key].className}`}
    >
      {key === 'concluida' ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : key === 'em_andamento' ? (
        <Clock3 className="h-3.5 w-3.5" />
      ) : (
        <CircleDashed className="h-3.5 w-3.5" />
      )}
      {variants[key].label}
    </span>
  )
}

function KindIcon({ kind }: { kind: Step['kind'] }) {
  return kind === 'activity' ? (
    <BookOpen className="h-4 w-4" />
  ) : (
    <Calendar className="h-4 w-4" />
  )
}
interface StepsSectionProps {
  steps: Step[]
}

export function StepsSection({ steps }: StepsSectionProps) {
  const [openId, setOpenId] = useState<number | null>(null)

  const ordered = useMemo(
    () =>
      [...steps].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    [steps]
  )

  return (
    <div className="relative">

      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[rgb(34,34,34)]">
            Suas etapas
          </h2>
          <p className="text-sm text-[rgb(90,90,90)]">
            Acompanhe seu progresso com um visual leve e amigável.
          </p>  
        </div>
      </div>

      <div className="space-y-4">
        {ordered.map((step, index) => {
          const isOpen = openId === step.id

          // sem alterar tipos: lemos dados de event como any
          const eventData = (step.event as any) ?? {}
          const isEvento = eventData?.format === 'Evento'
          const mode = eventData?.mode as 'presencial' | 'online' | undefined
          const address = eventData?.address as string | undefined
          const meetingLink = eventData?.meetingLink as string | undefined

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              className="relative"
            >
              <Card className="w-full overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.06)] shadow-sm transition-all hover:shadow-md focus-within:shadow-md bg-white">
                <CardContent className="px-5 py-4">
                  <div className="flex flex-col gap-3">
                    {/* topo: título + ações */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="mb-1 inline-flex items-center gap-1.5 text-[13px] font-medium text-[rgb(70,70,70)]">
                          <span
                            className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[rgba(88,204,2,0.12)] text-[rgb(40,40,40)]"
                            title={step.kind === 'activity' ? 'Atividade' : 'Evento'}
                          >
                            <KindIcon kind={step.kind} />
                          </span>
                          <span className="truncate">
                            {step.kind === 'activity' ? 'Atividade' : 'Evento'}
                          </span>
                        </div>

                        <Link
                          href={`/etapa/${step.id}`}
                          className="block max-w-full text-balance text-lg font-semibold leading-snug text-[rgb(34,34,34)] hover:text-[rgb(20,20,20)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                          style={{ color: '#1f2937' }}
                        >
                          {step.title}
                        </Link>

                        {step.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-[rgb(105,105,105)]">
                            {step.description}
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <StatusPill status={step.status} />

                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`stage-panel-${step.id}`}
                          onClick={() =>
                            setOpenId(prev => (prev === step.id ? null : step.id))
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(0,0,0,0.08)] bg-white outline-none transition-all hover:bg-[rgba(0,0,0,0.02)] focus-visible:ring-2 focus-visible:ring-[rgba(88,204,2,0.45)]"
                        >
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          >
                            <ChevronDown
                              className="h-4 w-4"
                              style={{ color: DUO_GREEN_DARK }}
                            />
                          </motion.span>
                        </button>
                      </div>
                    </div>

                    {/* meta + CTA */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-[rgb(95,95,95)]">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(0,0,0,0.04)] px-2.5 py-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {step.date
                              ? new Date(step.date).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })
                              : 'Sem data'}
                          </span>
                        </span>

                        {step.kind === 'activity' && step.activity?.dueDate && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(255,212,59,0.2)] px-2.5 py-1 text-[rgb(85,70,0)]">
                            <Clock3 className="h-3.5 w-3.5" />
                            entrega:{' '}
                            {new Date(step.activity.dueDate).toLocaleDateString(
                              'pt-BR',
                              { day: '2-digit', month: 'short' }
                            )}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/etapa/${step.id}`}
                        className="group inline-flex items-center gap-2 rounded-xl border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-sm font-medium text-[rgb(40,40,40)] transition-all hover:-translate-y-0.5 hover:border-[rgba(88,204,2,0.35)] hover:shadow-sm focus-visible:ring-2 focus-visible:ring-[rgba(88,204,2,0.45)]"
                      >
                        Ver detalhes
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          style={{ color: DUO_GREEN_DARK }}
                        />
                      </Link>
                    </div>

                    {/* painel expansível */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`stage-panel-${step.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white">
                            <div
                              className="rounded-t-xl px-4 py-2 text-xs font-medium"
                              style={{ background: SOFT_MINT }}
                            >
                              Informações
                            </div>

                            <div className="grid gap-3 p-4 text-sm">
                              {/* bloco evento */}
                              {isEvento && (
                                <div className="grid gap-2">
                                  {mode && (
                                    <div className="inline-flex items-center gap-2 rounded-lg bg-[rgba(88,204,2,0.08)] px-3 py-2">
                                      <Info className="h-4 w-4" />
                                      <span className="font-medium">Modalidade:</span>
                                      <span className="capitalize">{mode}</span>
                                    </div>
                                  )}

                                  {mode === 'presencial' && address && (
                                    <div className="inline-flex items-center gap-2 rounded-lg bg-[rgba(0,0,0,0.04)] px-3 py-2">
                                      <MapPin className="h-4 w-4" />
                                      <span className="font-medium">Endereço:</span>
                                      <span>{address}</span>
                                    </div>
                                  )}

                                  {mode === 'online' && meetingLink && (
                                    <div className="inline-flex items-center gap-2 rounded-lg bg-[rgba(0,0,0,0.04)] px-3 py-2">
                                      <Video className="h-4 w-4" />
                                      <span className="font-medium">Link:</span>
                                      <a
                                        href={meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline decoration-dotted underline-offset-2 hover:opacity-90"
                                      >
                                        {meetingLink}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* bloco atividade */}
                              {step.kind === 'activity' && (
                                <div className="rounded-lg p-3" style={{ background: SOFT_SKY }}>
                                  <div className="mb-1 text-[13px] font-semibold text-[rgb(55,55,55)]">
                                    Detalhes da atividade
                                  </div>
                                  <ul className="grid gap-1.5 text-[13px] text-[rgb(85,85,85)]">
                                    <li className="flex items-center gap-2">
                                      <Clock3 className="h-3.5 w-3.5" />
                                      Prazo:{' '}
                                      {step.activity?.dueDate
                                        ? new Date(step.activity.dueDate).toLocaleDateString(
                                            'pt-BR',
                                            { day: '2-digit', month: 'short', year: 'numeric' }
                                          )
                                        : '—'}
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <BookOpen className="h-3.5 w-3.5" />
                                      Arquivo:{' '}
                                      {step.activity?.file ? (
                                        <a
                                          className="underline decoration-dotted underline-offset-2 hover:opacity-90"
                                          href={step.activity.file}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          abrir
                                        </a>
                                      ) : (
                                        '—'
                                      )}
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
