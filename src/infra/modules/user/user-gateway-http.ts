import { client, HttpClient } from "@/infra/external/http";
import { GetUserDTO } from "./dto/get-user-dto";
import { CreateUser, UserGateway } from "./user-gateway";
import { User } from "@/app/adm/usuario-edital/page";

export class UserGatewayHttp implements UserGateway {

  constructor(private readonly client: HttpClient) { }

  async get(): Promise<GetUserDTO> {
    const result = await this.client.get<GetUserDTO>("/me");
    console.log(result)
    if (result.isLeft()) {
      throw new Error("Usuário não autenticado.");
    }

    return result.value;
  }

  async getAll(): Promise<User[]> {
    const result = await this.client.get<User[]>("/user")

    if (result.isLeft()) {
      throw new Error("Não foi possível encontrar os usuários.")
    }

    return result.value
  }

  async create(props: CreateUser): Promise<void> {
    const result = await this.client.post("/user", props)

    if (result.isLeft()) {
      throw new Error("Não foi possível criei esse usuário.")
    }
  }
}

export const userGatewayHttp = new UserGatewayHttp(client);