export interface ActivityStepGateway {
  delete(stepId: number): Promise<void>
}
