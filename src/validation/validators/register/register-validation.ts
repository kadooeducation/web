import { Role } from '@/business/domain/role';
import * as z from 'zod'

export const registerValidation = z.object({
  name: z.string().min(1, 'Informe seu nome.'),
  email: z.email('Informe um email válido.').min(1, "Informe seu email."),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  confirmPassword: z.string().min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres.'),
  cpf: z.string().min(11, 'Informe um CPF válido.').max(14),
  role: z.enum([Role.STUDENT, Role.MENTOR]),
  birthDate: z.date().min(new Date('1900-01-01'), 'Informe uma data de nascimento válida.').optional(),
  area: z.array(z.string()).max(3, 'Máximo de 3 áreas.').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
})