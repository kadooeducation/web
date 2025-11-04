import { ArrowRight, Link2, UserPlus } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/external/components/ui/card";

export default function ManagementPage() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-6 bg-white">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciamento</h1>
      </header>

      <main className=" px-4">
        <div className="w-full grid md:grid-cols-4 gap-6 sm:grid-cols-2">
          <Link href="/adm/criar-usuario" className="group">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-neutral-900">
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" /> Criar usuário
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-60 transition-all group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription className="text-neutral-600">
                  Cadastrar um novo usuário na plataforma.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/adm/equipes/criar" className="group">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-neutral-900">
                  <span className="flex items-center gap-2">
                    <Link2 className="h-5 w-5" /> Criar equipe
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-60 transition-all group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription className="text-neutral-600">
                  Crie uma equipe para participar de um edital.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/adm/usuarios-equipes" className="group">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-neutral-900">
                  <span className="flex items-center gap-2">
                    <Link2 className="h-5 w-5" /> Atrelar um usuário a uma equipe
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-60 transition-all group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription className="text-neutral-600">
                  Adicionar um usuário existente a uma equipe em específico.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/adm/equipes-editais" className="group">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-neutral-900">
                  <span className="flex items-center gap-2">
                    <Link2 className="h-5 w-5" /> Atrelar uma equipe a um edital
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-60 transition-all group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription className="text-neutral-600">
                  Adicionar uma equipe existente a um edital específico.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
