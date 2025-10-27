import ky, { type KyInstance } from 'ky'
import type { CookiesFn } from 'cookies-next/server'
import cookiesNext from 'cookies-next'

export class KyAdapter {
  private readonly api: KyInstance

  constructor() {
    this.api = ky.create({
      prefixUrl: "https://api-x5hq.onrender.com/api",
      timeout: 60000,
      hooks: {
        beforeRequest: [
          async (request) => {

            let cookieStore: CookiesFn | undefined

            if (typeof window === 'undefined') {
              const { cookies: serverCookies } = await import("next/headers")

              cookieStore = serverCookies
            }

            const token = await cookiesNext.getCookie("kadoo.token", { cookies: cookieStore })

            if (token) {
              request.headers.set("Authorization", `Bearer ${token}`)
            }

          }
        ]
      }
    })
  }


  async post<T>(url: string, body: object) {
    try {
      const result = await this.api.post<T>(url, { json: body })

      return result.json()
    } catch (error) {
      throw new Error("Erro" + error)
    }
  }

  async get<T>(url: string) {
    try {
      const result = await this.api.get<T>(url)

      return result.json()
    } catch (error) {
      console.log(error)
      throw new Error("Erro" + error)
    }
  }

}

export const kyClient = new KyAdapter()