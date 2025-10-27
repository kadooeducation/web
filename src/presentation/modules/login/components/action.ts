"use server"

import { kyClient } from "@/infra/external/http/ky-client/api"
import { HTTPError } from "ky"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import z from "zod"

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
})

export async function signInWithEmail(data: FormData) {

  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.treeifyError(result.error)
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await kyClient.post<{ token: string }>("auth/login", { email, password })
      ; (await cookies()).set("kadoo.token", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

  } catch (error) {
    if (error instanceof HTTPError) {
      const result = await error.response.json()

      return {
        success: false,
        message: result.message,
        errors: null
      }
    }

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null
    }
  }

  redirect("/")
}