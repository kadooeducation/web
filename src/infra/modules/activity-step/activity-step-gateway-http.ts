import { HttpClient, client } from "@/infra/external/http"
import { ActivityStepGateway } from "./activity-step-gateway"

export class ActivityStepGatewayHttp implements ActivityStepGateway {
  constructor(private readonly client: HttpClient) { }

  async delete(stepId: number): Promise<void> {
    await this.client.delete(`/activity-step/${stepId}`)
  }
}

export const activityStepGatewayHttp = new ActivityStepGatewayHttp(client)