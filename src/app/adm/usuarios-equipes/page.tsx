import type { User } from "@/business/domain/user";
import { kyClient } from "@/infra/external/http/ky-client/api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/external/components/ui/card";
import { UsersTeamsForm } from "@/presentation/modules/adm/users-teams/create/users-teams-form";

async function getAllUsers() {
  const users = await kyClient.get<User[]>("users");

  return users;
}

async function getAllTeams() {
  const teams = await kyClient.get<{ id: number; name: string }[]>("teams");

  return teams;
}

export default async function UsersTeamsPage() {
  const users = await getAllUsers();

  const teams = await getAllTeams();
  return (
    <div className="min-h-screen">
      <main className="max-w-3xl px-4 py-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">
            Atrelar um usuário a uma equipe
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Selecione um usuário e uma equipe e confirme abaixo.
          </p>
        </div>

        <Card className="border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-neutral-900">
              Atrelar usuário
            </CardTitle>
            <CardDescription className="text-neutral-600">
              Escolha as opções e confirme.
            </CardDescription>
          </CardHeader>

          <UsersTeamsForm users={users} teams={teams} />
        </Card>
      </main>
    </div>
  );
}
