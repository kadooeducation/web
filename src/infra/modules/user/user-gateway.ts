import type { EnumProfile } from "@/presentation/shared/layout/components/profile/profile";
import { GetUserDTO } from "./dto/get-user-dto";

export interface CreateUser {
  name: string
  cpf: string
  password: string
  email: string
}

export interface UserGateway {
  get(): Promise<GetUserDTO>
  getAll(): Promise<{id: string, name: string, role: EnumProfile }[]>
  create(props: CreateUser): Promise<void>
}