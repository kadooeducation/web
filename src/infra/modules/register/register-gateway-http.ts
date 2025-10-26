import { client, HttpClient } from "@/infra/external/http";
import { CreateRegisterDTO } from "./dto/create-register-dto";
import { RegisterGateway } from "./register-gateway";
import { Role } from "@/business/domain/role";

export class RegisterGatewayHttp implements RegisterGateway {

  constructor(private readonly client: HttpClient) { }

  async create(user: CreateRegisterDTO): Promise<void> {

    const url = {
      [Role.STUDENT]: '/student-profile',
      [Role.MENTOR]: '/mentor-profile'
    }

    const result = await this.client.post(url[user.role], { description: "", linkedin: "linkedin.com", ...user })

    if (result.isLeft()) {
      throw new Error("Ocorreu um erro ao criar o usuário")
    }
  }
}

export const registerGatewayHttp = new RegisterGatewayHttp(client)