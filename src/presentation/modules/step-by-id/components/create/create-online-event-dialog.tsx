"use client"

import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/presentation/external/components/ui/dialog"
import { Input as ShadInput } from "@/presentation/external/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/presentation/external/components/ui/popover"
import { Calendar as CalIcon, Link2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/external/components/ui/select"
import { Button } from "@/presentation/external/components/ui/button"
import { Calendar as CalendarShad } from "@/presentation/external/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { cn } from "@/presentation/external/lib/utils"
import { Textarea } from "@/presentation/external/components/ui/textarea"
import { PropsWithChildren, startTransition, useTransition } from "react"
import { createOnlineStepAction } from "@/app/adm/editais/[id]/(actions)/create-online-step-action"
import { toast } from "sonner"

const schema = z.object({
  title: z.string().min(1, "Informe o título."),
  date: z.date(),
  modality: z.literal("Online"),
  meetingLink: z.url("Informe um link válido."),
  description: z.string().min(1, "Descreva o evento.")
})

type FormData = z.infer<typeof schema>

interface CreateOnlineEventDialogProps extends PropsWithChildren {
  edictId: number
}

export function CreateOnlineEventDialog({ edictId, children }: CreateOnlineEventDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      date: undefined,
      modality: "Online",
      meetingLink: "",
      description: ""
    }
  })

  const [isPending, startTransition] = useTransition()

  async function onSubmit(data: FormData) {
    startTransition(async () => {
      await createOnlineStepAction(edictId, {
        ...data,
        meetingLink: data.meetingLink,
        date: new Date(data.date)
      })
      toast.success(`Etapa ${data.title} criada com sucesso!`)
      reset()
    })
  }

  return (
    <Dialog onOpenChange={(open) => {
      if (!open) reset()
    }}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Novo Evento Online</DialogTitle>
          <DialogDescription>Preencha os campos para adicionar um evento online.</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-2" onSubmit={handleSubmit(onSubmit)}>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Título *</span>
            <ShadInput placeholder="Ex: Workshop de Pitch" {...register("title")} />
            {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="grid gap-1">
              <span className="text-sm font-medium">Data *</span>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn("w-full justify-start", !field.value && "text-muted-foreground")}
                      >
                        <CalIcon className="mr-2 h-4 w-4" />
                        {field.value ? field.value.toLocaleDateString("pt-BR") : "Selecionar"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <CalendarShad
                        mode="single"
                        captionLayout="dropdown"
                        locale={ptBR}
                        selected={field.value}
                        onSelect={(d) => field.onChange(d ?? undefined)}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.date && <span className="text-xs text-red-500">{errors.date.message}</span>}
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium">Modalidade *</span>
              <Controller
                control={control}
                name="modality"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.modality && <span className="text-xs text-red-500">{errors.modality.message}</span>}
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Link da reunião *</span>
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-gray-400" />
              <ShadInput placeholder="https://..." {...register("meetingLink")} />
            </div>
            {errors.meetingLink && <span className="text-xs text-red-500">{errors.meetingLink.message}</span>}
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Descrição *</span>
            <Textarea rows={4} placeholder="Detalhes do evento" {...register("description")} />
            {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
          </label>

          <DialogFooter className="mt-1">
            <Button className="bg-[#5127FF] hover:bg-[#5127FF]/90" type="submit" disabled={isSubmitting}>
              {isPending ? "Adicionando..." : "Adicionar Evento"}
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" type="button">Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>

      <DialogTrigger asChild>{children}</DialogTrigger>
    </Dialog>
  )
}
