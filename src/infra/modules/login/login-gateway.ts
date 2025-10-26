import { LoginRequestDTO } from "./dto/login-request-dto";

export interface LoginGateway {
  login(user: LoginRequestDTO): Promise<void>
  logout(): Promise<void>
}