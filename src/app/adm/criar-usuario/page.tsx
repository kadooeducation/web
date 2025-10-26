"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/presentation/external/components/ui/card";
import { Input } from "@/presentation/external/components/ui/input";
import { Label } from "@/presentation/external/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { Button } from "@/presentation/external/components/ui/button";
import { userGatewayHttp } from "@/infra/modules/user/user-gateway-http";

const schema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.email("E-mail inválido"),
  password: z.string().min(8, "Mínimo de 8 caracteres"),
  cpf: z
    .string()
    .min(11, "CPF inválido")
    .max(11, "CPF inválido")
    .regex(/^\d+$/, "Apenas números"),
});

type FormData = z.infer<typeof schema>;

export default function CreateUserPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {

    setStatus("idle");
    setMessage("");

    userGatewayHttp.create({
      cpf: data.cpf,
      email: data.email,
      name: data.name,
      password: data.password
    }).then(() => {
      setStatus("success");
      setMessage("Usuário criado com sucesso!");
    }).catch(() => {
      setStatus("error");
      setMessage("Algo deu errado. Tente novamente.");
    })
  }

  return (
    <div className="min-h-screen bg-white font-['Poppins']">

      {/* Hero minimalista */}
      <section className="border-b">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Criar usuário</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Cadastre um novo usuário preenchendo nome, e-mail e senha.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Card className="border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-neutral-900">
              <UserPlus className="h-5 w-5" /> Novo usuário
            </CardTitle>
            <CardDescription className="text-neutral-600">
              Insira as informações abaixo. Campos marcados com * são obrigatórios.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  placeholder="Ex.: Maria Silva"
                  {...register("name")}
                  className="focus-visible:ring-2 focus-visible:ring-offset-2"
                />
                {errors.name && (
                  <p className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" /> {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input id="email" type="email" placeholder="maria@exemplo.com" {...register("email")} />
                {errors.email && (
                  <p className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" /> {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Senha *</Label>
                <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
                <span className="text-xs text-neutral-500">Mínimo de 8 caracteres.</span>
                {errors.password && (
                  <p className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" /> {errors.password.message}
                  </p>
                )}
              </div>


              <div className="grid gap-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  placeholder="Ex.: 12345678901"
                  {...register("cpf")}
                />
                {errors.cpf && (
                  <p className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" /> {errors.cpf.message}
                  </p>
                )}
              </div>

              {status !== "idle" && (
                <div
                  className={
                    "flex items-center gap-2 rounded-xl border p-3 text-sm " +
                    (status === "success"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700")
                  }
                >
                  {status === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span>{message}</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex items-center justify-between mt-4">
              <Button type="button" variant="outline" onClick={() => {
                setStatus("idle")
                reset()
              }}>
                Limpar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="relative"
                style={{ backgroundColor: "#5127FF", color: "#fff" }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Salvando
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" /> Criar usuário
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 rounded-2xl border p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-700">Precisa importar vários usuários?</p>
            <Button variant="secondary" className="font-medium" style={{ backgroundColor: "#F4DA02", color: "#1f1f1f" }}>
              Importar CSV
            </Button>
          </div>
        </div>
      </main>

      <footer className="mt-10 border-t">
        <div className="mx-auto max-w-3xl px-4 py-8 text-xs text-neutral-500">
          © {new Date().getFullYear()} Kadoo — Plataforma de aceleração
        </div>
      </footer>
    </div>
  );
}
