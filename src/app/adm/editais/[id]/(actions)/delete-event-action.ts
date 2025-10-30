'use server'

import { revalidatePath } from 'next/cache'
import { stepGatewayHttp } from '@/infra/modules/step/step-gateway-http'
import { eventGatewayHttp } from '@/infra/modules/event/event-gateway-http'
import { kyClient } from '@/infra/external/http/ky-client/api'

export async function deleteEventAction(stepId: number) {

  await kyClient.delete(`steps/${stepId}`)

  // await eventGatewayHttp.delete(stepId)

  revalidatePath('/adm/editais/[id]', 'page')
}
