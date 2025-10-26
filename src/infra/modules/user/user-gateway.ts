import { User } from "@/app/adm/usuario-edital/page";
import { GetUserDTO } from "./dto/get-user-dto";

export interface CreateUser {
  name: string
  cpf: string
  password: string
  email: string
}

export interface UserGateway {
  get(): Promise<GetUserDTO>
  getAll(): Promise<User[]>
  create(props: CreateUser): Promise<void>
}