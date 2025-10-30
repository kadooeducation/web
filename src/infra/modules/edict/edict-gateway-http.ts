import { notFound } from 'next/navigation'
import { client, type HttpClient } from '@/infra/external/http'
import type { CreateEdictDTO } from './dto/create-edict-dto'
import type { EdictDTO } from './dto/edict-dto'
import type { EdictGateway, UpdateEdictDTO } from './edict-gateway'

export class EdictGatewayHttp implements EdictGateway {
  constructor(private readonly client: HttpClient) {}

  async create(edict: CreateEdictDTO): Promise<void> {
    await this.client.post('/edict', {
      ...edict,
    })
  }

  async getAll(): Promise<EdictDTO[]> {
    const response = await this.client.get<EdictDTO[]>('/edict')

    if (response.isLeft()) {
      throw new Error('Erro ao buscar editais.')
    }

    return response.value.map((edict) => {
      return {
        ...edict,
        startDate: new Date(edict.startDate),
        endDate: new Date(edict.endDate),
      }
    })
  }

  async getById(id: number): Promise<EdictDTO> {
    const response = await this.client.get<EdictDTO>(`/edict/${id}`)

    if (response.isLeft()) {
      return notFound()
    }

    return response.value
  }

  async update(edict: UpdateEdictDTO): Promise<void> {
    await this.client.put(`/edict/${edict.id}`, {
      ...edict,
      startDate: new Date(edict.startDate),
      endDate: new Date(edict.endDate),
    })
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/edict/${id}`)
  }

  async edictsAttachUser(): Promise<EdictDTO[]> {
    const result = await this.client.get<EdictDTO[]>('/user-edict')

    if (result.isLeft()) {
      throw new Error('Editais não encontrados.')
    }

    return result.value
  }
}

export const edictGatewayHttp = new EdictGatewayHttp(client)
