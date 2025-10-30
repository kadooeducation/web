import type z from 'zod'
import type { createEdictValidation } from '@/validation/validators/create-edict/create-edict-validation'

export type CreateEdictValidation = z.infer<typeof createEdictValidation>
