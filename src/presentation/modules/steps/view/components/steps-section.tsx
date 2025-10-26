'use client'
import { useState } from "react"
import { Card, CardContent } from "@/presentation/external/components/ui/card"
import { Badge } from "@/presentation/external/components/ui/badge"
import { ArrowRight, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { Step } from "@/infra/modules/step/step-gateway"

interface StepsSectionProps {
  steps: Step[]
}

export function StepsSection({ steps }: StepsSectionProps) {
  const [openId, setOpenId] = useState<string | number | null>(null)

  return (
    <div className="space-y-6 relative">
      {steps.map((step, index) => {
        const isOpen = openId === step.id
        const isEvento = step?.event?.format === "Evento"

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="relative flex gap-4"
          >
            {/* <div className="flex flex-col items-center">
              {step.status === "Ativo" ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : step.status === "em_andamento" ? (
                <Clock3 className="w-6 h-6 text-yellow-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
              {index < steps.length - 1 && (
                <div className="w-px h-20 bg-gray-200 mt-1" />
              )}
            </div> */}

            <Card className="w-full rounded-2xl border border-gray-200 shadow-sm">
              <CardContent className="px-6 py-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/etapa/${step.id}`}
                      className="text-lg font-semibold text-[#5127FF] hover:underline underline-offset-2"
                    >
                      {step.title}
                    </Link>

                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          step.status === "concluida"
                            ? "bg-green-100 text-green-700"
                            : step.status === "em_andamento"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }
                      >
                        {step.status === "concluida"
                          ? "Concluída"
                          : step.status === "em_andamento"
                            ? "Em andamento"
                            : "Pendente"}
                      </Badge>

                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`stage-panel-${step.id}`}
                        onClick={() => setOpenId(prev => (prev === step.id ? null : step.id))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 transition"
                      >
                        <ChevronDown
                          className={`w-4 h-4 text-[#5127FF] transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 capitalize">
                      {step.kind === "activity" ? "Atividade" : "Evento"}{" "}
                      {"date" in step && step.date ? `• ${new Date(step.date).toLocaleDateString("pt-BR", {
                        
                      })}` : ""}
                    </span>

                    <Link
                      href={`/etapa/${step.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#5127FF] hover:opacity-90"
                    >
                      Ver detalhes
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`stage-panel-${step.id}`}
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                      layout
                    >
                      <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
                        {isEvento && (
                          <>
                            {"mode" in step.event && step.event.mode && (
                              <p>
                                <span className="font-medium">Modalidade:</span> {step.event.mode}
                              </p>
                            )}

                            {"mode" in step.event &&
                              step.event.mode === "presencial" &&
                              "address" in step.event &&
                              step.event.address && (
                                <p>
                                  <span className="font-medium">Endereço:</span> {step.event.address}
                                </p>
                              )}

                            {"mode" in step.event &&
                              step.event.mode === "online" &&
                              "meetingLink" in step.event &&
                              step.event.meetingLink && (
                                <p>
                                  <span className="font-medium">Link:</span>{" "}
                                  <a
                                    href={step.event.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                  >
                                    {step.event.meetingLink}
                                  </a>
                                </p>
                              )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
