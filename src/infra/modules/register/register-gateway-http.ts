import { Role } from '@/business/domain/role'
import { client, type HttpClient } from '@/infra/external/http'
import type { CreateRegisterDTO } from './dto/create-register-dto'
import type { RegisterGateway } from './register-gateway'

export class RegisterGatewayHttp implements RegisterGateway {
  constructor(private readonly client: HttpClient) {}

  async create(user: CreateRegisterDTO): Promise<void> {
    const url = {
      [Role.STUDENT]: '/student-profile',
      [Role.MENTOR]: '/mentor-profile',
    }

    const result = await this.client.post(url[user.role], {
      description: '',
      linkedin: 'linkedin.com',
      ...user,
    })

    if (result.isLeft()) {
      throw new Error('Ocorreu um erro ao criar o usuário')
    }
  }
}

export const registerGatewayHttp = new RegisterGatewayHttp(client)
