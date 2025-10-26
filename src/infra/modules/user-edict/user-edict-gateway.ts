import { CreateUserEdictDTO } from "./dto/create-user-edict-dto";

export interface UserEdictGateway {
  create({ edictId, userId }: CreateUserEdictDTO): Promise<void>
}