'use server'

import { revalidatePath } from 'next/cache'
import { stepGatewayHttp } from '@/infra/modules/step/step-gateway-http'
import { eventGatewayHttp } from '@/infra/modules/event/event-gateway-http'

export async function deleteEventAction(stepId: number) {

  await eventGatewayHttp.delete(stepId)

  revalidatePath('/adm/editais/[id]', 'page')
}
