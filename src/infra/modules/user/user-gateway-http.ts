import type { ProfileEnum } from "@/business/domain/enum/enum-profile";
import { client, type HttpClient } from "@/infra/external/http";
import type { GetUserDTO } from "./dto/get-user-dto";
import type { CreateUser, UserGateway } from "./user-gateway";

export class UserGatewayHttp implements UserGateway {
  constructor(private readonly client: HttpClient) {}

  async get(): Promise<GetUserDTO> {
    const result = await this.client.get<GetUserDTO>("/me");
    if (result.isLeft()) {
      throw new Error("Usuário não autenticado.");
    }

    return result.value;
  }

  async getAll(): Promise<{ id: string; name: string; role: ProfileEnum }[]> {
    const result = await this.client.get<{ id: string; name: string, role: ProfileEnum }[]>(
      "/user"
    );

    if (result.isLeft()) {
      throw new Error("Não foi possível encontrar os usuários.");
    }

    return result.value;
  }

  async create(props: CreateUser): Promise<void> {
    const result = await this.client.post("/user", props);

    if (result.isLeft()) {
      throw new Error("Não foi possível criei esse usuário.");
    }
  }
}

export const userGatewayHttp = new UserGatewayHttp(client);
