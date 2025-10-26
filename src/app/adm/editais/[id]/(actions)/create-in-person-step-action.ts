'use server'

import { revalidatePath } from 'next/cache'
import { stepGatewayHttp } from '@/infra/modules/step/step-gateway-http'

export async function createInPersonStepAction(edictId: number, input: {
  title: string
  date: Date
  modality: 'Presencial'
  address: string
  description: string
}) {
  await stepGatewayHttp.createInPerson({
    title: input.title,
    date: input.date,
    mode: input.modality,
    address: input.address,
    format: 'Evento',
    description: input.description,
    edictId
  })

  revalidatePath(`/adm/editais/${edictId}`)
}
