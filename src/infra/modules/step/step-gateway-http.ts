import { client, HttpClient } from "@/infra/external/http";
import { CreateActivityStepProps, CreateOnlineStepProps, CreateStepProps, Step, StepGateway } from "./step-gateway";

export class StepGatewayHttp implements StepGateway {
  constructor(private readonly client: HttpClient) { }
  async getByEdictId(edictId: number): Promise<Step[]> {
    const result = await this.client.get<Step[]>(`/steps/edict/${edictId}`)

    if (result.isLeft()) {
      throw new Error("Etapas não encontradas.")
    }

    return result.value
  }

  async getById(stepId: number): Promise<Step> {
    const result = await this.client.get<Step>(`/steps/${stepId}`)

    if (result.isLeft()) {
      throw new Error("Etapa não encontrada.")
    }

    return result.value
  }

  async createInPerson(props: CreateStepProps): Promise<void> {
    await this.client.post("/event/in-person", props)
  }

  async createOnline(props: CreateOnlineStepProps): Promise<void> {
    await this.client.post("/event/online", props)
  }

  
  async createActivity(props: CreateActivityStepProps): Promise<void> {
    await this.client.post("/activity-step", props)
  }

}

export const stepGatewayHttp = new StepGatewayHttp(client)