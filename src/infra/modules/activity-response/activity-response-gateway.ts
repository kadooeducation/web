export interface ActivityResponse {
  response: string
  pdf: string
  stepId: number
}

export interface ActivityResponseGateway {
  userAlreadyResponseByStepId(stepId: number): Promise<boolean>
  create(activityResponse: ActivityResponse): Promise<void>
}