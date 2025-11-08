export interface Step {
  id: number
  title: string
  description: string
  date: Date
  status: string
  event: Event
  kind: string
  time: string
  disable: boolean
  activity?: {
    dueDate: Date
    file: string
  }
}

interface Event {
  id: number
  type: string
  mode: string
  format: string
  meetingLink: string
  address: string
}

export interface CreateStepProps {
  title: string
  description: string
  date: Date
  address: string
  mode: string
  format: string
  edictId: number
}

export interface CreateOnlineStepProps {
  title: string
  description: string
  date: Date
  meetingLink: string
  mode: string
  format: string
  edictId: number
}
export interface CreateActivityStepProps {
  title: string
  description: string
  date: Date
  dueDate: Date
  file: string
  edictId: number
}
export interface StepGateway {
  getByEdictId(edictId: number): Promise<Step[]>
  getById(stepId: number): Promise<Step>
  createInPerson(props: CreateStepProps): Promise<void>
  createOnline(props: CreateOnlineStepProps): Promise<void>
  createActivity(props: CreateActivityStepProps): Promise<void>
}
