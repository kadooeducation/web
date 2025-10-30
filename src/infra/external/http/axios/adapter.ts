import axios, { type AxiosError, type AxiosInstance, isAxiosError } from 'axios'
import type { HttpClient } from '@/infra/external/http/http-client'
import {
  type JsCookieBrowserStorage,
  jsCookieBrowserStorage,
} from '@/infra/external/storage/js-cookie-browser-storage'
import { type Either, left, right } from '@/infra/shared/utils/either'

const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME

export class AxiosAdapter implements HttpClient {
  private readonly api: AxiosInstance

  constructor(private readonly browser: JsCookieBrowserStorage) {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    })

    this.api.interceptors.request.use((config) => {
      const token = this.browser.get(process.env.NEXT_PUBLIC_TOKEN_NAME)

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    this.api.interceptors.response.use(
      (res) => res,
      async (err: AxiosError) => {
        const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME as string

        const isServer = typeof window === 'undefined'

        if (err.response?.status === 401 && !isServer) {
          await this.browser.delete(tokenName)
          window.location.href = '/login'
        }

        return Promise.reject(err)
      },
    )
  }

  async get<Result>(
    url: string,
    params?: object | undefined,
  ): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.get<Result>(url, {
        params,
      })
      return right(data)
    } catch (error) {
      if (isAxiosError(error)) {
        return left(new Error(error.response?.data.message))
      }

      return left(new Error('Ocorreu um erro interno.'))
    }
  }

  async post<Result>(
    url: string,
    body: object,
  ): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.post<Result>(url, body)

      return right(data)
    } catch (error) {
      if (isAxiosError(error)) {
        return left(new Error(error.response?.data.message))
      }

      return left(new Error('Ocorreu um erro interno.'))
    }
  }

  async delete<Result>(url: string): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.delete<Result>(url)

      return right(data)
    } catch (error) {
      if (isAxiosError(error)) {
        return left(new Error(error.response?.data.message))
      }

      return left(new Error('Ocorreu um erro interno.'))
    }
  }

  async patch<Result>(
    url: string,
    body: object,
  ): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.patch<Result>(url, body)

      return right(data)
    } catch (error) {
      if (isAxiosError(error)) {
        return left(new Error(error.response?.data.message))
      }

      return left(new Error('Ocorreu um erro interno.'))
    }
  }

  async put<Result>(url: string, body: object): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.put<Result>(url, body)

      return right(data)
    } catch (error) {
      if (isAxiosError(error)) {
        return left(new Error(error.response?.data.message))
      }

      return left(new Error('Ocorreu um erro interno.'))
    }
  }
}
const _getToken = () => jsCookieBrowserStorage.get(tokenName)
export const client = new AxiosAdapter(jsCookieBrowserStorage)
