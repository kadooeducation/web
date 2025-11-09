import type { EdictStatusEnum } from "./enum/edict-status-enum"

export interface Edict {
  id: number
  title: string
  description: string
  startDate: Date
  endDate: Date
  organizer: string
  contact: string
  location: string
  status: EdictStatusEnum
  file: string
  categories: string[]
}
