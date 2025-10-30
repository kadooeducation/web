'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalIcon, MapPin } from 'lucide-react'
import { type PropsWithChildren, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/presentation/external/components/ui/button'
import { Calendar as CalendarShad } from '@/presentation/external/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/presentation/external/components/ui/dialog'
import { Input as ShadInput } from '@/presentation/external/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/presentation/external/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/external/components/ui/select'
import { Textarea } from '@/presentation/external/components/ui/textarea'
import { cn } from '@/presentation/external/lib/utils'

const schema = z.object({
  title: z.string().min(1, 'Informe o título.'),
  date: z.date(),
  modality: z.literal('Presencial'),
  address: z.string().min(1, 'Informe o endereço.'),
  description: z.string().min(1, 'Descreva o evento.'),
})

type FormData = z.infer<typeof schema>

interface CreateInPersonEventDialogProps extends PropsWithChildren {
  edictId: number
  onCreateStepAction: (
    edictId: number,
    input: {
      title: string
      date: Date
      modality: 'Presencial'
      address: string
      description: string
    },
  ) => Promise<void>
}

export function CreateInPersonEventDialog({
  edictId,
  onCreateStepAction,
  children,
}: CreateInPersonEventDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      date: undefined,
      modality: 'Presencial',
      address: '',
      description: '',
    },
  })

  const [isPending, startTransition] = useTransition()

  async function onSubmit(data: FormData) {
    startTransition(async () => {
      await onCreateStepAction(edictId, {
        ...data,
        date: new Date(data.date),
      })
      toast.success(`Etapa ${data.title} criada com sucesso!`)
      reset()
    })
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) reset()
      }}
    >
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Novo Evento Presencial</DialogTitle>
          <DialogDescription>
            Preencha os campos para adicionar um evento presencial.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-2" onSubmit={handleSubmit(onSubmit)}>
          <label className="grid gap-1" htmlFor="title">
            <span className="text-sm font-medium">Título *</span>
            <ShadInput
              placeholder="Ex: Workshop de Pitch"
              {...register('title')}
            />
            {errors.title && (
              <span className="text-xs text-red-500">
                {errors.title.message}
              </span>
            )}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="grid gap-1" htmlFor="date">
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
                        className={cn(
                          'w-full justify-start',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? field.value.toLocaleDateString('pt-BR')
                          : 'Selecionar'}
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
              {errors.date && (
                <span className="text-xs text-red-500">
                  {errors.date.message}
                </span>
              )}
            </label>

            <label className="grid gap-1" htmlFor="modality">
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
                      <SelectItem value="Presencial">Presencial</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.modality && (
                <span className="text-xs text-red-500">
                  {errors.modality.message}
                </span>
              )}
            </label>
          </div>

          <label className="grid gap-1" htmlFor="address">
            <span className="text-sm font-medium">Endereço *</span>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <ShadInput
                placeholder="Rua, número, bairro, cidade"
                {...register('address')}
              />
            </div>
            {errors.address && (
              <span className="text-xs text-red-500">
                {errors.address.message}
              </span>
            )}
          </label>

          <label className="grid gap-1" htmlFor="description">
            <span className="text-sm font-medium">Descrição *</span>
            <Textarea
              rows={4}
              placeholder="Detalhes do evento"
              {...register('description')}
            />
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}
          </label>

          <DialogFooter className="mt-1">
            <Button
              className="bg-[#5127FF] hover:bg-[#5127FF]/90"
              type="submit"
              disabled={isSubmitting}
            >
              {isPending ? 'Adicionando...' : 'Adicionar Evento'}
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>

      <DialogTrigger asChild>{children}</DialogTrigger>
    </Dialog>
  )
}
