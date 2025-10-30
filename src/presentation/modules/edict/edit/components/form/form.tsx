'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, FileText, Loader2, Tag, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { toast } from 'sonner'
import z from 'zod'
import { edictGatewayHttp } from '@/infra/modules/edict/edict-gateway-http'
import { Button } from '@/presentation/external/components/ui/button'
import { Calendar as CalendarShad } from '@/presentation/external/components/ui/calendar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/presentation/external/components/ui/card'
import { Checkbox } from '@/presentation/external/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/presentation/external/components/ui/popover'
import { ScrollArea } from '@/presentation/external/components/ui/scroll-area'
import { Separator } from '@/presentation/external/components/ui/separator'
import { Textarea } from '@/presentation/external/components/ui/textarea'
import { cn } from '@/presentation/external/lib/utils'
import { Input, Label } from '@/presentation/shared/components'

const availableCategories = [
  'Tecnologia',
  'Impacto Social',
  'Sustentabilidade',
  'Saúde',
  'Educação',
  'Fintech',
  'E-commerce',
  'Agritech',
  'Foodtech',
  'Mobilidade',
]

const schema = z.object({
  title: z.string().min(1, 'Título é obrigatório.'),
  description: z.string().min(1, 'Descrição é obrigatória.'),
  organizer: z.string().min(1, 'Insira o Organizador do Edital.'),
  contact: z.string(),
  location: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  file: z.string(),
  categories: z
    .array(z.string())
    .min(1, 'Pelo menos uma categoria deve ser selecionada.'),
})

type EditEdictValidation = z.infer<typeof schema>

interface FormProps {
  edict: {
    id: number
    status: string
    title: string
    description: string
    organizer: string
    file: string
    contact: string
    location: string
    startDate: Date
    endDate: Date
    categories: string[]
  }
}

export function Form({ edict }: FormProps) {
  const { push } = useRouter()

  const [previewMode, setPreviewMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const [edictFile, setEdictFile] = useState<File | null>(null)

  const {
    register,
    watch,
    control,
    handleSubmit,
  } = useForm<EditEdictValidation>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: edict.title,
      description: edict.description,
      organizer: edict.organizer,
      contact: edict.contact,
      location: edict.location,
      startDate: new Date(edict.startDate),
      endDate: new Date(edict.endDate),
      file: edict.file,
      categories: edict.categories,
    },
    shouldUnregister: false,
  })

  function removeEdictFile() {
    setEdictFile(null)
  }

  async function uploadFile<T>(file: File): Promise<T> {
    const formData = new FormData()
    formData.set('file', file)

    const response = await fetch(`/api/upload-file`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Erro ao enviar`)
    }

    const data: T = await response.json()
    return data
  }

  async function handleUpdateEdictForm(data: EditEdictValidation) {
    let edictUrl = ''

    if (edictFile) {
      const { url: edictPdf } = await uploadFile<{
        url: string
        error: boolean
      }>(edictFile)

      edictUrl = edictPdf
    }

    try {
      setLoading(true)
      await edictGatewayHttp.update({
        id: edict.id,
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        file: edictFile ? edictUrl : edict.file,
      })
      toast.success('Edital atualizado com sucesso!')

      push('/adm/editais')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const startDate = watch('startDate')
  const endEdictDate = watch('endDate')
  const descriptionWatched = watch('description')

  return (
    <form
      className="space-y-8"
      onSubmit={handleSubmit(handleUpdateEdictForm)}
      encType="multipart/form-data"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#5127FF]" />
          <h2 className="text-xl font-semibold text-gray-900">
            Informações do Edital
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Input.Root>
            <Input.Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Título do Edital *
            </Input.Label>
            <Input.Core
              id="title"
              placeholder="Ex: Programa de Aceleração Tech 2024"
              className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
              {...register('title')}
            />
          </Input.Root>

          <Input.Root>
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Descrição do Edital *
            </Label>

            <div className="flex items-center gap-4 mb-2 text-sm">
              <Button
                role="button"
                onClick={() => setPreviewMode(false)}
                className={clsx(
                  'cursor-pointer transition-all',
                  !previewMode
                    ? 'text-[#5127FF] font-semibold'
                    : 'text-gray-400',
                )}
              >
                Editar
              </Button>

              <span className="text-gray-300">|</span>

              <Button
                role="button"
                onClick={() => setPreviewMode(true)}
                className={clsx(
                  'cursor-pointer transition-all',
                  previewMode
                    ? 'text-[#5127FF] font-semibold'
                    : 'text-gray-400',
                )}
              >
                Preview
              </Button>
            </div>

            {!previewMode ? (
              <Textarea
                id="description"
                placeholder="Digite a descrição do edital aqui usando markdown..."
                rows={12}
                className="resize-none rounded-md border border-gray-300 focus:border-[#5127FF]"
                {...register('description')}
              />
            ) : (
              <ScrollArea className="h-[300px] rounded-md border border-gray-300 p-4 bg-gray-50">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: (props) => (
                      <h1 className="text-2xl font-bold" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-xl font-semibold" {...props} />
                    ),
                    p: (props) => <p className="leading-relaxed" {...props} />,
                  }}
                >
                  {descriptionWatched || '_Sem conteúdo para pré-visualizar._'}
                </ReactMarkdown>
              </ScrollArea>
            )}
          </Input.Root>

          <Input.Root>
            <Label
              htmlFor="organizer"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Organizador do Edital
            </Label>
            <Input.Core
              id="organizer"
              placeholder="Escreva quem irá organizar o Edital"
              className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
              {...register('organizer')}
            />
          </Input.Root>

          <Input.Root>
            <Label
              htmlFor="contact"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Email para contato
            </Label>
            <Input.Core
              id="contact"
              placeholder="Email para contato"
              className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
              {...register('contact')}
            />
          </Input.Root>

          <Input.Root>
            <Label
              htmlFor="contact"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Localização do Edital
            </Label>
            <Input.Core
              id="location"
              placeholder="Ex: São Luís, Imperatriz"
              className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
              {...register('location')}
            />
          </Input.Root>
        </div>
      </div>

      <Separator className="bg-gray-300" />

      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#5127FF]" />
          <h2 className="text-xl font-semibold text-gray-900">Datas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input.Root>
            <Input.Label
              htmlFor="startDate"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Data de Início *
            </Input.Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !startDate && 'text-muted-foreground',
                  )}
                >
                  <span className="text-left w-full">
                    {startDate
                      ? format(startDate, 'PPP', { locale: ptBR })
                      : 'Selecione uma data'}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CalendarShad
                      mode="single"
                      selected={value}
                      onSelect={onChange}
                      onDayBlur={onBlur}
                      required
                      captionLayout="dropdown"
                      locale={ptBR}
                    />
                  )}
                />
              </PopoverContent>
            </Popover>
          </Input.Root>

          <Input.Root>
            <Input.Label
              htmlFor="endDate"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Data de Fim *
            </Input.Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={!startDate}
                  variant="outline"
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !endEdictDate && 'text-muted-foreground',
                  )}
                >
                  <span className="text-left w-full">
                    {endEdictDate
                      ? format(endEdictDate, 'PPP', { locale: ptBR })
                      : 'Selecione uma data'}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field: { onChange, onBlur } }) => (
                    <CalendarShad
                      mode="single"
                      selected={endEdictDate}
                      onDayBlur={onBlur}
                      onSelect={onChange}
                      disabled={(date) => !startDate || date <= startDate}
                      locale={ptBR}
                      captionLayout="dropdown"
                    />
                  )}
                />
              </PopoverContent>
            </Popover>
          </Input.Root>
        </div>

        <Input.Root>
          <Input.Label className="text-sm font-medium text-gray-700 block">
            Arquivo PDF do edital
          </Input.Label>

          {edict.file ? (
            <div className="w-full flex justify-between">
              <Link href={edict.file} target="_blank" className="underline">
                Ver arquivo
              </Link>
              <X
                role="button"
                className="cursor-pointer"
                onClick={removeEdictFile}
              />
            </div>
          ) : (
            <Input.Core
              type="file"
              accept="application/pdf"
              className="w-full"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0] ?? null
                setEdictFile(file)
              }}
            />
          )}
        </Input.Root>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-[#5127FF]" />
          <h2 className="text-xl font-semibold text-gray-900">Categorias</h2>
        </div>

        <Controller
          control={control}
          name="categories"
          render={({ field }) => (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {availableCategories?.map((category) => {
                const isChecked = field.value.includes(category)

                const toggleCategory = () => {
                  if (isChecked) {
                    field.onChange(field.value.filter((c) => c !== category))
                  } else {
                    field.onChange([...field.value, category])
                  }
                }

                return (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={isChecked}
                      onCheckedChange={toggleCategory}
                      className="data-[state=checked]:bg-[#5127FF] data-[state=checked]:border-[#5127FF] data-[state=checked]:text-white"
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                )
              })}
            </div>
          )}
        />
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          type="submit"
          disabled={loading}
          className="bg-[#F4DA02] text-black hover:bg-[#F4DA02]/90 font-semibold px-8 py-3 h-auto"
        >
          {loading && <Loader2 className="h-5 w-5 animate-spin" />}
          {loading ? 'Atualizando...' : 'Atualizar Edital'}
        </Button>
      </div>

      <Card className="mt-6 border-0 shadow-sm ring-1 ring-[#5127FF]/10">
        <CardHeader>
          <CardTitle className="text-base font-medium text-[#5127FF]">
            Edite aqui as Etapas desse edital
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Link href={`/adm/editais/${edict?.id}`}>
            <Button
              variant="outline"
              className="text-[#5127FF] hover:bg-[#5127FF]/10"
            >
              Ir para Etapas
            </Button>
          </Link>
        </CardContent>
      </Card>
    </form>
  )
}
