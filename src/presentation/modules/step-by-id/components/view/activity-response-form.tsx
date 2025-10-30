'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { activityResponseGatewayHttp } from '@/infra/modules/activity-response/activity-response-gateway-http'
import { Button } from '@/presentation/external/components/ui/button'
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
import { Textarea } from '@/presentation/external/components/ui/textarea'
import { uploadFile } from '@/presentation/modules/edict/create/components/form/form'
import { Input } from '@/presentation/shared/components'

const schema = z.object({
  answer: z.string().min(1, 'Informe sua resposta.'),
})

type FormData = z.infer<typeof schema>

interface ActivityResponseFormProps {
  stepId: number
}

export function ActivityResponseForm({ stepId }: ActivityResponseFormProps) {
  const { replace } = useRouter()

  const [pdf, setPdf] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { answer: '' },
    mode: 'onChange',
  })

  const onSubmit = async (data: FormData) => {
    let pdfUrl = ''

    if (pdf) {
      const { url } = await uploadFile<{ url: string; error: boolean }>(pdf)
      pdfUrl = url
    }

    await activityResponseGatewayHttp
      .create({
        pdf: pdfUrl ?? '',
        response: data.answer,
        stepId,
      })
      .then(() => {
        toast.success('Atividade enviada com sucesso!')
        replace(`/etapa/${stepId}`)
      })
      .catch((_err) => {
        toast.error('Erro ao enviar atividade')
      })
  }

  const formId = 'activity-response-form'

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      encType="multipart/form-data"
    >
      <div className="space-y-2">
        <label htmlFor="answer" className="text-sm font-medium text-slate-700">
          Resposta / Observações
        </label>
        <Textarea
          id="answer"
          placeholder="Descreva sua solução, links de protótipos ou anotações importantes…"
          className="min-h-32 resize-y"
          {...register('answer')}
        />
        <p className="text-xs text-slate-500">
          Dica: seja objetivo e inclua referências (links) se necessário.
        </p>
      </div>

      <div className="space-y-2">
        <Input.Root>
          <Input.Label className="text-sm font-medium text-gray-700 block">
            Arquivo PDF do edital (opcional)
          </Input.Label>

          <Input.Core
            type="file"
            accept="application/pdf"
            className="w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0] ?? null
              setPdf(file)
            }}
          />
        </Input.Root>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          variant="outline"
          className="border-slate-300"
          type="button"
          onClick={() => reset()}
        >
          Limpar
        </Button>

        <Dialog>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#5127FF]">
                Confirmar envio
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                após enviar,{' '}
                <span className="font-medium">
                  não será possível editar a resposta
                </span>
                . deseja continuar?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline" className="border-slate-300">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                className="bg-[#5127FF] hover:bg-[#4522d9] text-white"
                type="submit"
                form={formId}
              >
                Enviar agora
              </Button>
            </DialogFooter>
          </DialogContent>

          <DialogTrigger asChild>
            <Button
              className="bg-[#5127FF] hover:bg-[#4522d9] text-white"
              type="button"
              disabled={!isValid}
            >
              Enviar
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </form>
  )
}
