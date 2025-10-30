'use server'

import { HTTPError } from 'ky'
import z from 'zod'
import { kyClient } from '@/infra/external/http/ky-client/api'

export const createEdictSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório.'),
  description: z.string().min(1, 'Descrição é obrigatória.'),
  organizer: z.string().min(1, 'Insira o Organizador do Edital.'),
  contact: z.string(),
  location: z.string(),
  startDate: z.date({
    error: 'A data de início é obrigatória',
  }),
  endDate: z.date({
    error: 'A data de término é obrigatória',
  }),
  categories: z
    .array(z.string())
    .min(1, 'Pelo menos uma categoria deve ser selecionada.'),
})

export async function createEdict(data: FormData) {
  const result = createEdictSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.treeifyError(result.error)
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const edict = result.data

  try {
    await kyClient.post('edict', { edict })
  } catch (error) {
    if (error instanceof HTTPError) {
      const result = await error.response.json()

      return {
        success: false,
        message: result.message,
        errors: null,
      }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }
}
