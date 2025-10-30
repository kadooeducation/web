import { client, type HttpClient } from '@/infra/external/http'
import type { EventGateway } from './event-gateway'

export class EventGatewayHttp implements EventGateway {
  constructor(private readonly client: HttpClient) {}

  async delete(stepId: number): Promise<void> {
    await this.client.delete(`/steps/${stepId}`)
  }
}

export const eventGatewayHttp = new EventGatewayHttp(client)
