'use server'

import { revalidatePath } from 'next/cache'
import { activityStepGatewayHttp } from '@/infra/modules/activity-step/activity-step-gateway-http'

export async function deleteActivityStepAction(stepId: number) {
  await activityStepGatewayHttp.delete(stepId)

  revalidatePath('/adm/editais/[id]', 'page')
}
