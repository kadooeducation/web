import type { Role } from '@/business/domain/role'

export interface CreateRegisterDTO {
  name: string
  email: string
  password: string
  cpf: string
  role: Role
  birthDate?: Date
  area?: string[]
  description?: string
}
