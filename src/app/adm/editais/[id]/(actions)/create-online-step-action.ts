'use server'

import { revalidatePath } from 'next/cache'
import { stepGatewayHttp } from '@/infra/modules/step/step-gateway-http'

export async function createOnlineStepAction(edictId: number, input: {
  title: string
  date: Date
  modality: 'Online'
  meetingLink: string
  description: string
}) {
  await stepGatewayHttp.createOnline({
    title: input.title,
    date: input.date,
    mode: input.modality,
    format: 'Evento',
    meetingLink: input.meetingLink,
    description: input.description,
    edictId
  })

  revalidatePath(`/adm/editais/${edictId}`)
}
