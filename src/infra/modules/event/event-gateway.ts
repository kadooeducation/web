export interface EventGateway {
  delete(stepId: number): Promise<void>
}
