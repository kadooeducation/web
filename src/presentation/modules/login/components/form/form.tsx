'use client'

import { loginGatewayHttp } from "@/infra/modules/login/login-gateway-http";
import { Input } from "@/presentation/shared/components";
import { useForm } from "react-hook-form";
import { LoginValidation } from "@/validation/protocols/login/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation } from "@/validation/validators/login/login-validation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/shared/constants/routes";
import { toast } from "sonner";
import Link from "next/link";

export function Form() {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValidation>({
    resolver: zodResolver(loginValidation)
  });

  async function handleSubmitLogin(data: LoginValidation) {
    setIsLoading(true);

    try {
      await loginGatewayHttp.login(data);
      toast.success("Login realizado com sucesso!");
      push(APP_ROUTES.home);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        toast.error(error?.message)
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-6 w-full mt-5" onSubmit={handleSubmit(handleSubmitLogin)}>
      <Input.Root>
        <Input.Label htmlFor="email">Email</Input.Label>
        <Input.Core
          id="email"
          type="email"
          placeholder="seu@email.com"
          className="w-full"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </Input.Root>

      <Input.Root>
        <Input.Label htmlFor="password">Senha</Input.Label>
        <Input.Core
          id="password"
          type="password"
          placeholder="••••••••••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </Input.Root>

      <Link href={APP_ROUTES.register} className="underline">Esqueceu a senha?</Link>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-black hover:opacity-90 transition-all text-white font-medium rounded-lg px-6 py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {isLoading ? '' : 'Entrar'}
      </button>
    </form>
  );
}
