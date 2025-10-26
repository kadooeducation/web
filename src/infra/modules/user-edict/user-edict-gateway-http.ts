import { client, HttpClient } from "@/infra/external/http";
import { UserEdictGateway } from "./user-edict-gateway";
import { CreateUserEdictDTO } from "./dto/create-user-edict-dto";

export class UserEdictGatewayHttp implements UserEdictGateway {

  constructor(private readonly client: HttpClient) { }

  async create({ edictId, userId }: CreateUserEdictDTO): Promise<void> {
    const result = await this.client.post("/user-edict", { edictId, userId });

    if (result.isLeft()) {
      throw new Error("Usuário já está cadastrado nesse edital.")
    }
  }
}

export const userEdictGatewayHttp = new UserEdictGatewayHttp(client);