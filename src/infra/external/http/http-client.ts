import type { Either } from '@/infra/shared/utils/either'

export interface HttpClient {
  post<Result>(url: string, body: object): Promise<Either<Error, Result>>
  get<Result>(url: string): Promise<Either<Error, Result>>
  patch<Result>(url: string, body: object): Promise<Either<Error, Result>>
  put<Result>(url: string, body: object): Promise<Either<Error, Result>>
  delete<Result>(url: string): Promise<Either<Error, Result>>
}
