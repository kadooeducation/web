"use client"

import { deleteEventAction } from "@/app/adm/editais/[id]/(actions)/delete-event-action"

import { Button } from "@/presentation/external/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/external/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/presentation/external/components/ui/dialog"
import { Separator } from "@/presentation/external/components/ui/separator"

import { Calendar as CalIcon, Link2, MapPin, Loader2, Footprints } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/presentation/shared/components"
import { Input } from "@/presentation/external/components/ui/input"

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

function isoToDateInput(iso?: string) {
  if (!iso) return ""
  const d = new Date(iso)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

const baseSchema = z.object({
  title: z.string().min(1, "Informe o título."),
  date: z.string().optional(),
})

const onlineSchema = baseSchema.extend({
  meetingLink: z.url("Link inválido").min(1, "Informe o link da reunião."),
})

const inPersonSchema = baseSchema.extend({
  address: z.string().min(1, "Informe o endereço."),
})

export function EventStepCard({ step }: any) {
  const [isPending, startTransition] = useTransition()
  const [openEdit, setOpenEdit] = useState(false)

  const pill = stepPill(step)
  const PillIcon = pill.icon

  console.log(step)

  const isOnline = step.event?.type === "online"
  const schema = isOnline ? onlineSchema : inPersonSchema

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: isOnline
      ? {
        title: step?.title ?? "",
        date: isoToDateInput(step.date),
        meetingLink: step.event?.meetingLink ?? "",
      }
      : {
        title: step.title ?? "",
        date: isoToDateInput(step.date),
        address: step.event?.address ?? "",
      }
  })

  function handleDeleteEvent() {
    startTransition(async () => {
      await deleteEventAction(step.id)
      toast.success(`Etapa ${step.title} deletada com sucesso!`)
      if (typeof window !== "undefined") window.location.reload()
    })
  }

  function onSubmit(values: any) {
    startTransition(async () => {
      try {
        if (isOnline) {
          // await updateOnlineEventAction(step.id, {
          //   title: values.title,
          //   date: values.date || null,
          //   meetingLink: values.meetingLink,
          // })
        } else {
          // await updateInPersonEventAction(step.id, {
          //   title: values.title,
          //   date: values.date || null,
          //   address: values.address,
          // })
        }
        toast.success("Evento atualizado com sucesso!")
        setOpenEdit(false)
        if (typeof window !== "undefined") window.location.reload()
      } catch (err) {
        console.error(err)
        toast.error("Erro ao atualizar o evento.")
      }
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
          <Button size="sm" variant="outline" onClick={() => setOpenEdit(true)}>
            Editar
          </Button>

          <Dialog>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Deletar etapa</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja deletar esta etapa? Essa ação não pode ser desfeita.
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
      </CardContent>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Editar evento</DialogTitle>
            <DialogDescription>
              Atualize os dados do evento e salve as alterações.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" placeholder="Título do evento" {...register("title")} />
              {errors.title && <p className="text-xs text-red-600">{String(errors.title.message)}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Data </Label>
              <Input id="date" type="date" {...register("date")} />
              {errors.date && <p className="text-xs text-red-600">{String(errors.date.message)}</p>}
            </div>

            {isOnline ? (
              <div className="grid gap-2">
                <Label htmlFor="meetingLink">Link da reunião</Label>
                <Input id="meetingLink" placeholder="https://..." {...register("meetingLink")} />
                {errors.meetingLink && <p className="text-xs text-red-600">{String(errors.meetingLink.message)}</p>}
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Rua, número - bairro, cidade/UF" {...register("address")} />
                {errors.address && <p className="text-xs text-red-600">{String(errors.address.message)}</p>}
              </div>
            )}

            <Separator />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenEdit(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#5127FF] hover:bg-[#5127FF]/90" disabled={isPending} aria-busy={isPending}>
                {isPending ? "Salvando..." : "Salvar alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
