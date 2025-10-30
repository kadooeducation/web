'use server'

import { revalidatePath } from 'next/cache'
import { kyClient } from '@/infra/external/http/ky-client/api'

export async function createActivityStepAction(
  edictId: number,
  input: {
    title: string
    date: Date
    dueDate: Date
    file: string
    description: string
  },
) {
  await kyClient.post('activity-step', {
    title: input.title,
    date: input.date,
    dueDate: new Date(input.dueDate),
    file: input.file,
    description: input.description,
    edictId,
  })

  revalidatePath(`/adm/editais/${edictId}`)
}
