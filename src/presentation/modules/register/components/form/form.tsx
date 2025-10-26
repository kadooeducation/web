'use client'

import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/presentation/external/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/presentation/external/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/presentation/external/components/ui/select'
import { cn } from '@/presentation/external/lib/utils'
import { Input } from '@/presentation/shared/components/form/input/input'
import { Check, Loader2 } from 'lucide-react'

import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from '@/presentation/external/components/ui/calendar'
import { registerGatewayHttp } from '@/infra/modules/register/register-gateway-http'
import { Role } from '@/business/domain/role'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/shared/constants/routes'
import { Controller, useForm } from 'react-hook-form'
import { RegisterValidation } from '@/validation/protocols/register/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerValidation } from '@/validation/validators/register/register-validation'

const AREA_OPTIONS = ["Educação", "Finanças", "Tecnologia", "Saúde", "Marketing", "Vendas"]

export function Form() {
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    watch
  } = useForm<RegisterValidation>({
    resolver: zodResolver(registerValidation),
    mode: 'all',
    defaultValues: {
      role: Role.STUDENT,
    },
  })

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    setValue('cpf', value)
  }

  const watchRole = watch('role')
  const watchExpertiseArea = watch('area')

  async function handleSubmitRegisterForm(data: RegisterValidation) {
    try {
      await registerGatewayHttp.create({

        ...data,
        cpf: data.cpf.replace(/\D/g, ''),
        area: data.area
      })

      push(APP_ROUTES.login)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitRegisterForm)} className="space-y-6">
      <div className="space-y-4">
        <Input.Root>
          <Input.Label htmlFor="name">Nome completo</Input.Label>
          <Input.Core id="name" placeholder="Digite seu nome completo" {...register('name')} />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="email">E-mail</Input.Label>
          <Input.Core id="email" type="email" placeholder="Digite seu e-mail" {...register('email')} />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="password">Senha</Input.Label>
          <Input.Core id="password" type="password" placeholder="Crie uma senha" {...register('password')} />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="confirmPassword">Confirmar senha</Input.Label>
          <Input.Core id="confirmPassword" type="password" placeholder="Confirme sua senha" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="cpf">CPF</Input.Label>
          <Input.Core id="cpf" placeholder="000.000.000-00" maxLength={14} {...register('cpf')} onChange={handleCPFChange} />
          {errors.cpf && <p className="text-sm text-red-600">{errors.cpf.message}</p>}
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="role">Tipo de usuário</Input.Label>
          <Select
            onValueChange={(value) =>
              setValue('role', value as Role, { shouldValidate: true })
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione seu tipo" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white border border-gray-200 shadow-md rounded-md">
              <SelectItem value="student">Estudante</SelectItem>
              <SelectItem value="mentor">Mentor</SelectItem>
            </SelectContent>
          </Select>
        </Input.Root>

        {watchRole === 'student' && (
          <>
            <Input.Root>
              <Input.Label htmlFor="birthDate">Data de nascimento</Input.Label>
              <Controller
                control={control}
                name="birthDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="w-full text-left font-normal border border-gray-300 px-3 py-2 rounded-md text-sm flex items-center justify-between"
                      >
                        {field.value ? format(field.value, "dd/MM/yyyy") : <span className="text-gray-400">Selecione a data</span>}
                        <CalendarIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date ?? undefined)}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.birthDate && <p className="text-sm text-red-600">{errors.birthDate.message}</p>}
            </Input.Root>
          </>
        )}

        {watchRole === 'mentor' && (
          <Input.Root>
            <Input.Label>Áreas de atuação (máx. 3)</Input.Label>
            <Controller
              control={control}
              name="area"
              render={({ field }) => {
                const value = field.value ?? []

                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "w-full min-h-[44px] px-3 py-2 border border-gray-300 rounded-md text-sm text-left",
                          "flex flex-wrap items-start gap-1",
                          "hover:border-[#5f2eea] focus:outline-none focus:ring-2 focus:ring-[#5f2eea]",
                          value.length === 0 && "text-gray-400"
                        )}
                      >
                        {value.length > 0 ? value.join(', ') : "Selecione até 3 áreas"}
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-full p-0 bg-white shadow-md rounded-md z-50">
                      <Command>
                        <CommandInput placeholder="Buscar área..." className="border-b" />
                        <CommandEmpty>Nenhuma área encontrada.</CommandEmpty>
                        <CommandList>
                          {AREA_OPTIONS.map((area) => {
                            const isSelected = value.includes(area)
                            return (
                              <CommandItem
                                key={area}
                                onSelect={() => {
                                  if (isSelected) {
                                    field.onChange(value.filter((a) => a !== area))
                                  } else if (value.length < 3) {
                                    field.onChange([...value, area])
                                  }
                                }}
                                className="flex justify-between border-none"
                              >
                                {area}
                                {isSelected && <Check className="w-4 h-4 text-primary" />}
                              </CommandItem>
                            )
                          })}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )
              }}
            />
            {Array.isArray(watchExpertiseArea) && watchExpertiseArea.length >= 3 && (
              <p className="text-xs text-red-500 mt-2">Máximo de 3 áreas selecionadas.</p>
            )}
          </Input.Root>
        )}
      </div>

      <div className='w-full'>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black hover:opacity-90 transition-all text-white font-medium rounded-lg px-6 py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed w-full"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          {isSubmitting ? '' : 'Entrar'}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-neutral-700">
          Já possui uma conta?{' '}
          <button
            type="button"
            onClick={() => push(APP_ROUTES.login)}
            className="font-medium text-[#5f2eea] hover:text-[#5f2eea]/80 transition-colors"
          >
            Faça login
          </button>
        </p>
      </div>
    </form>
  )
}
