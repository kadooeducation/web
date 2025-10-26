'use server'

import { revalidatePath } from 'next/cache'
import { stepGatewayHttp } from '@/infra/modules/step/step-gateway-http'

export async function createActivityStepAction(edictId: number, input: {
  title: string
  date: Date
  dueDate: Date
  file: string
  description: string
}) {
  await stepGatewayHttp.createActivity({
    title: input.title,
    date: input.date,
    dueDate: new Date(input.dueDate),
    file: input.file,
    description: input.description,
    edictId
  })

  revalidatePath(`/adm/editais/${edictId}`)
}
