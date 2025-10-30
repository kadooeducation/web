import type z from 'zod'
import type { loginValidation } from '@/validation/validators/login/login-validation'

export type LoginValidation = z.infer<typeof loginValidation>
