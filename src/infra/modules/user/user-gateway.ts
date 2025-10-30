import type { GetUserDTO } from "./dto/get-user-dto";

export interface CreateUser {
  name: string;
  cpf: string;
  password: string;
  email: string;
}

export interface UserGateway {
  get(): Promise<GetUserDTO>;
  getAll(): Promise<{ id: string; name: string }[]>;
  create(props: CreateUser): Promise<void>;
}
