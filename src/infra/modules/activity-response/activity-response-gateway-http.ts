import { client, type HttpClient } from '@/infra/external/http'
import type {
  ActivityResponse,
  ActivityResponseGateway,
} from './activity-response-gateway'

export class ActivityResponseGatewayHttp implements ActivityResponseGateway {
  constructor(private readonly client: HttpClient) {}

  async userAlreadyResponseByStepId(stepId: number): Promise<boolean> {
    const result = await this.client.get<boolean>(
      `/activity-response/${stepId}`,
    )

    if (result.isLeft()) {
      throw new Error('Não foi possível buscar.')
    }

    return result.value
  }

  async create(activityResponse: ActivityResponse): Promise<void> {
    await this.client.post('/activity-response', activityResponse)
  }
}

export const activityResponseGatewayHttp = new ActivityResponseGatewayHttp(
  client,
)
