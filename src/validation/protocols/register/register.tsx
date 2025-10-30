import type z from 'zod'
import type { registerValidation } from '@/validation/validators/register/register-validation'

export type RegisterValidation = z.infer<typeof registerValidation>
