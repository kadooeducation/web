import { client, type HttpClient } from '@/infra/external/http'
import type { BrowserStorage } from '@/infra/external/storage/browser-storage'
import { jsCookieBrowserStorage } from '@/infra/external/storage/js-cookie-browser-storage'
import type { LoginRequestDTO } from './dto/login-request-dto'
import type { LoginResponseDTO } from './dto/login-response-dto'
import type { LoginGateway } from './login-gateway'

export class LoginGatewayHttp implements LoginGateway {
  constructor(
    private readonly client: HttpClient,
    private readonly storage: BrowserStorage,
  ) {}

  async login(user: LoginRequestDTO): Promise<void> {
    const result = await this.client.post<LoginResponseDTO>('/auth/login', user)

    if (result.isLeft()) {
      throw new Error(result?.value?.message)
    }

    const { token } = result.value

    this.storage.set(process.env.NEXT_PUBLIC_TOKEN_NAME, token)
  }

  async logout(): Promise<void> {
    this.storage.delete(process.env.NEXT_PUBLIC_TOKEN_NAME)
  }
}

export const loginGatewayHttp = new LoginGatewayHttp(
  client,
  jsCookieBrowserStorage,
)
