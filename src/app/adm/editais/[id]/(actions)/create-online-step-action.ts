'use server'

import { revalidatePath } from 'next/cache'
import { kyClient } from '@/infra/external/http/ky-client/api'

export async function createOnlineStepAction(
  edictId: number,
  input: {
    title: string
    date: Date
    modality: 'Online'
    meetingLink: string
    description: string
  },
) {
  await kyClient.post(`event/online`, {
    title: input.title,
    date: input.date,
    mode: input.modality,
    format: 'Evento',
    meetingLink: input.meetingLink,
    description: input.description,
    edictId,
  })

  revalidatePath(`/adm/editais/${edictId}`)
}
