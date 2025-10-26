import * as jose from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY)

export async function decrypt(cookie: string | undefined) {
  if (!cookie) return
  try {
    const { payload } = await jose.jwtVerify(cookie, SECRET_KEY)
    return payload
  } catch {
    return 'invalid'
  }
}
