import { getCookie } from 'cookies-next'
import type { CookiesFn } from 'cookies-next/server'
import ky, { HTTPError, type KyInstance } from 'ky'

export class KyAdapter {
  private readonly api: KyInstance

  constructor() {
    this.api = ky.create({
      prefixUrl: process.env.NEXT_PUBLIC_API_URL,
      timeout: 60000,
      hooks: {
        beforeRequest: [
          async (request) => {
            let cookieStore: CookiesFn | undefined

            if (typeof window === 'undefined') {
              const { cookies: serverCookies } = await import('next/headers')

              cookieStore = serverCookies
            }

            const token = await getCookie('kadoo.token', {
              cookies: cookieStore,
            })

            if (token) {
              request.headers.set('Authorization', `Bearer ${token}`)
            }
          },
        ],
      },
    })
  }

  async post<T>(url: string, body: object): Promise<T> {
    try {
      const res = await this.api.post(url, { json: body })

      if (res.status === 201 || res.status === 204)  {
        return { } as T
      }

      return res.json<T>() ?? null
    } catch (err) {
      if (err instanceof HTTPError) throw err
      throw err
    }
  }

  async get<T>(url: string) {
    try {
      const res = await this.api.get(url)
      return res.json<T>() ?? null
    } catch (err) {
      if (err instanceof HTTPError) throw err
      throw err
    }
  }

  async delete(url: string) {
    try {
      const res = await this.api.delete(url)
      const text = await res.text()
      return text ? JSON.parse(text) : null
    } catch (err) {
      if (err instanceof HTTPError) throw err
      throw err
    }
  }
}

export const kyClient = new KyAdapter()
