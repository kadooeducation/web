import type { CreateEdictDTO } from './dto/create-edict-dto'
import type { EdictDTO } from './dto/edict-dto'

export interface UpdateEdictDTO {
  id: number
  title: string
  description: string
  organizer: string
  contact: string
  location: string
  startDate: Date
  endDate: Date
  file: string
  categories: string[]
}

export interface EdictGateway {
  create(edict: CreateEdictDTO): Promise<void>
  getAll(): Promise<EdictDTO[]>
  getById(id: number): Promise<EdictDTO>
  update(edict: UpdateEdictDTO): Promise<void>
  delete(id: number): Promise<void>
  edictsAttachUser(): Promise<EdictDTO[]>
}
