"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/external/components/ui/alert";
import { Input } from "@/presentation/shared/components";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useFormState } from "@/shared/hooks/use-form-state";
import { signInWithEmail } from "../action";

export function Form() {
  const [{ success, message, errors }, handleSubmitLogin, isPending] =
    useFormState({
      action: signInWithEmail,
    });

  return (
    <form
      className="flex flex-col gap-6 w-full mt-5"
      onSubmit={handleSubmitLogin}
    >
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha no login!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <Input.Root>
        <Input.Label htmlFor="email">Email</Input.Label>
        <Input.Core
          id="email"
          type="email"
          name="email"
          placeholder="seu@email.com"
          className="w-full"
        />
        {errors?.properties?.email && (
          <p className="text-xs font-medium text-red-500 dar:text-red-400">
            {errors?.properties?.email.errors[0]}
          </p>
        )}
      </Input.Root>

      <Input.Root>
        <Input.Label htmlFor="password">Senha</Input.Label>
        <Input.Core
          id="password"
          type="password"
          name="password"
          placeholder="••••••••••••••••"
        />
        {errors?.properties?.password && (
          <p className="text-xs font-medium text-red-500 dar:text-red-400">
            {errors?.properties?.password.errors[0]}
          </p>
        )}
      </Input.Root>

      <Link href={APP_ROUTES.register} className="underline">
        Esqueceu a senha?
      </Link>

      <button
        type="submit"
        className="bg-black hover:opacity-90 transition-all text-white font-medium rounded-lg px-6 py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
        {isPending ? "" : "Entrar"}
      </button>
    </form>
  );
}
