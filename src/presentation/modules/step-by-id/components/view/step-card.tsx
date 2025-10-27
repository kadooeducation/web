"use client"

import { deleteActivityStepAction } from "@/app/adm/editais/[id]/(actions)/delete-activity-step-action"
import { deleteEventAction } from "@/app/adm/editais/[id]/(actions)/delete-event-action"
import { Button } from "@/presentation/external/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/external/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/presentation/external/components/ui/dialog"
import { Separator } from "@/presentation/external/components/ui/separator"

import { Footprints, Calendar as CalIcon, Clock3, Link2, MapPin, Loader2 } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("pt-BR") : "-"

const fmtMode = (s?: string | null) =>
  s ? s.toString().toLowerCase().replace(/^\w/, c => c.toUpperCase()) : "-"

const stepPill = (step: any) => {
  if (step.kind === "event") {
    const isOnline = step.event?.type === "online"
    return {
      icon: isOnline ? Link2 : MapPin,
      text: `Evento ${isOnline ? "Online" : "Presencial"}`
    }
  }
  return { icon: Footprints, text: "Atividade" }
}

export function StepCard({ step }: any) {

  const [isPending, startTransition] = useTransition()

  const pill = stepPill(step)
  const PillIcon = pill.icon

  function handleDeleteEvent() {
    startTransition(async () => {
      if (step.kind === "event") {
        await deleteEventAction(step.id)
      }
      else {
        await deleteActivityStepAction(step.id)
      }

      toast.success(`Etapa ${step.title} deletada com sucesso!`)
    })
  }

  return (
    <Card key={step.id} className="border-0 shadow-sm ring-1 ring-[#5127FF]/10">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#5127FF]/10 px-2.5 py-1 text-xs font-medium text-[#5127FF]">
            <PillIcon className="h-3.5 w-3.5" />
            {pill.text}
          </div>
          <CardTitle className="mt-2 text-base">{step.title}</CardTitle>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">Editar</Button>
          <Dialog>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Deletar edital</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja deletar este edital? Essa ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={handleDeleteEvent}
                  disabled={isPending}
                  aria-busy={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deletando etapa...
                    </>
                  ) : (
                    "Deletar"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive">Deletar</Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-gray-600 space-y-2">
        <div className="flex items-center gap-2">
          <CalIcon className="h-4 w-4 text-gray-500" />
          <span>Data: {fmtDate(step.date)}</span>
        </div>

        {step.kind === "event" && (
          <>
            {step.event?.meetingLink && (
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-gray-500" />
                <a
                  href={step.event.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  {step.event.meetingLink}
                </a>
              </div>
            )}

            {step.event?.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{step.event.address}</span>
              </div>
            )}

            <Separator className="my-2" />
            <div className="text-xs text-gray-500">
              formato: Evento • modo: {fmtMode(step.event?.type)}
            </div>
          </>
        )}

        {step.kind === "activity" && (
          <>
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-gray-500" />
              <span>Entrega até: {fmtDate(step.activity?.dueDate)}</span>
            </div>

            {step.activity?.file && (
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-gray-500" />
                <a
                  href={step.activity.file}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  Modelo / arquivo da atividade
                </a>
              </div>
            )}

            <Separator className="my-2" />
            <div className="text-xs text-gray-500">
              formato: Atividade{step.activity?.file ? " • arquivo obrigatório" : ""}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}