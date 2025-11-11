import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ProfileEnum } from "@/business/domain/enum/profile-enum";
import { kyClient } from "../ky-client/api";

export async function isAuthenticated() {
  return !!(await cookies()).get(process.env.NEXT_PUBLIC_TOKEN_NAME)?.value;
}

export async function auth() {
  const token = (await cookies()).get(
    process.env.NEXT_PUBLIC_TOKEN_NAME
  )?.value;

  if (!token) {
    redirect("/api/auth/sign-out");
  }

  try {
    const { name, email, avatarUrl, role } = await kyClient.get<{
      name: string;
      email: string;
      avatarUrl: string;
      role: ProfileEnum;
    }>("me");

    return {
      user: {
        name,
        email,
        avatarUrl,
        role,
      },
    };
  } catch (error) {
    console.error(error);
  }

  redirect("/api/auth/sign-out");
}
