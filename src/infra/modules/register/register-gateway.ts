import { CreateRegisterDTO } from "./dto/create-register-dto";


export interface RegisterGateway {
  create(user: CreateRegisterDTO): Promise<void>
}