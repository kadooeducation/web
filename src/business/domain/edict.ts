import type { EdictStatusEnum } from "./enum/edict-status-enum"

export interface Edict {
  id: number
  title: string
  description: string
  organizer: string
  contact: string
  location: string
  startDate: Date
  endDate: Date
  status: EdictStatusEnum
  file: string
  categories: string[]
}
