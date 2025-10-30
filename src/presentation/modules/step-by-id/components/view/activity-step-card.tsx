/** biome-ignore-all lint/suspicious/noExplicitAny: usado em tipagem externa sem controle */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Calendar as CalIcon,
  Clock3,
  Footprints,
  Link2,
  Loader2,
  MapPin,
  Paperclip,
  X,
} from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/presentation/external/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/presentation/external/components/ui/card'
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
import { Input } from '@/presentation/external/components/ui/input'
import { Separator } from '@/presentation/external/components/ui/separator'
import { Label } from '@/presentation/shared/components'

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('pt-BR') : '-'

const _fmtMode = (s?: string | null) =>
  s
    ? s
        .toString()
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase())
    : '-'

const stepPill = (step: any) => {
  if (step.kind === 'event') {
    const isOnline = step.event?.type === 'online'
    return {
      icon: isOnline ? Link2 : MapPin,
      text: `Evento ${isOnline ? 'Online' : 'Presencial'}`,
    }
  }
  return { icon: Footprints, text: 'Atividade' }
}

function isoToDateInput(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const schema = z.object({
  title: z.string().min(1, 'Informe o título.'),
  date: z.string().optional(),
  dueDate: z.string().min(1, 'Informe a data de entrega.'),
  file: z.string().url('URL inválida').optional().or(z.literal('')),
})
export function ActivityStepCard({ step }: any) {
  const [isPending, startTransition] = useTransition()
  const [openEdit, setOpenEdit] = useState(false)

  const pill = stepPill(step)
  const PillIcon = pill.icon

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: step.title ?? '',
      date: isoToDateInput(step.date),
      dueDate: isoToDateInput(step.activity?.dueDate),
      file: step.activity?.file ?? '',
    },
  })

  const fileValue = (watch('file') as string | undefined)?.trim()

  function handleDeleteActivity() {
    startTransition(async () => {
      // await deleteActivityStepAction(step.id)
      // toast.success(`Etapa ${step.title} deletada com sucesso!`)
      // if (typeof window !== "undefined") window.location.reload()
    })
  }

  function onSubmit(_values: any) {
    startTransition(async () => {
      try {
        // await updateActivityStepAction(step.id, {
        //   title: values.title,
        //   date: values.date || null,
        //   dueDate: values.dueDate,
        //   file: values.file || null,
        // })
        toast.success('Atividade atualizada com sucesso!')
        setOpenEdit(false)
        if (typeof window !== 'undefined') window.location.reload()
      } catch (err) {
        console.error(err)
        toast.error('Erro ao atualizar a atividade.')
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
          {/* EDITAR */}
          <Button size="sm" variant="outline" onClick={() => setOpenEdit(true)}>
            Editar
          </Button>

          {/* DELETAR */}
          <Dialog>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Deletar etapa</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja deletar esta etapa? Essa ação não pode
                  ser desfeita.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={handleDeleteActivity}
                  disabled={isPending}
                  aria-busy={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deletando etapa...
                    </>
                  ) : (
                    'Deletar'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive">
                Deletar
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-gray-600 space-y-2">
        <div className="flex items-center gap-2">
          <CalIcon className="h-4 w-4 text-gray-500" />
          <span>Data: {fmtDate(step.date)}</span>
        </div>

        {step.kind === 'activity' && (
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
              formato: Atividade
              {step.activity?.file ? ' • arquivo obrigatório' : ''}
            </div>
          </>
        )}
      </CardContent>

      {/* DIALOG DE EDIÇÃO (CONTROLADO) */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Editar atividade</DialogTitle>
            <DialogDescription>
              Atualize os dados da atividade e salve as alterações.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Título da atividade"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-xs text-red-600">
                  {String(errors.title.message)}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Data da etapa (opcional)</Label>
              <Input id="date" type="date" {...register('date')} />
              {errors.date && (
                <p className="text-xs text-red-600">
                  {String(errors.date.message)}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dueDate">Data de entrega</Label>
              <Input id="dueDate" type="date" {...register('dueDate')} />
              {errors.dueDate && (
                <p className="text-xs text-red-600">
                  {String(errors.dueDate.message)}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="file">URL do arquivo (opcional)</Label>
              <Input
                id="file"
                placeholder="https://..."
                {...register('file')}
              />
              {errors.file && (
                <p className="text-xs text-red-600">
                  {String(errors.file.message)}
                </p>
              )}

              {/* quando existir file no form, mostrar ações */}
              {fileValue && (
                <div className="mt-1 flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Paperclip className="h-4 w-4 text-[#5127FF]" />
                    <a
                      href={fileValue}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate text-sm font-medium text-[#5127FF] underline underline-offset-2"
                      title={fileValue}
                    >
                      Ver arquivo
                    </a>
                  </div>

                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => setValue('file', '')}
                    aria-label="Remover arquivo"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenEdit(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#5127FF] hover:bg-[#5127FF]/90"
                disabled={isPending}
                aria-busy={isPending}
              >
                {isPending ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
