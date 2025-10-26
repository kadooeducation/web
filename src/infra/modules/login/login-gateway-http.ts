import { client, HttpClient } from "@/infra/external/http";
import { LoginRequestDTO } from "./dto/login-request-dto";
import { LoginGateway } from "./login-gateway";
import { LoginResponseDTO } from "./dto/login-response-dto";
import { BrowserStorage } from "@/infra/external/storage/browser-storage";
import { jsCookieBrowserStorage } from "@/infra/external/storage/js-cookie-browser-storage";

export class LoginGatewayHttp implements LoginGateway {

  constructor(private readonly client: HttpClient, private readonly storage: BrowserStorage) { }
 

  async login(user: LoginRequestDTO): Promise<void> {

    const result = await this.client.post<LoginResponseDTO>('/auth/login', user)

    if (result.isLeft()) {
      console.log(result.value)
      throw new Error(result?.value?.message);
    }

    const { token } = result.value

    this.storage.set(process.env.NEXT_PUBLIC_TOKEN_NAME, token)
  }

  async logout(): Promise<void> {
    this.storage.delete(process.env.NEXT_PUBLIC_TOKEN_NAME)
  }
}

export const loginGatewayHttp = new LoginGatewayHttp(client, jsCookieBrowserStorage);