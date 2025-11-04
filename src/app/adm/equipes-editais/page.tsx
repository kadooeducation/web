import { kyClient } from "@/infra/external/http/ky-client/api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/external/components/ui/card";
import { TeamsEdictForm } from "@/presentation/modules/adm/users-edict/users-edict-form";

async function getAllTeams() {
  const teams = await kyClient.get<{ id: number; name: string }[]>("teams");

  return teams;
}

async function getAllEdicts() {
  const edicts = await kyClient.get<{ id: number; title: string }[]>("edict");

  return edicts;
}

export default async function TeamsEdictsPage() {

  const edicts = await getAllEdicts();

  const teams = await getAllTeams()

  return (
    <div className="min-h-screen">
      <main className="max-w-3xl px-4 py-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">
            Atrelar uma equipe a um edital
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Selecione uma equipe e o edital e confirme abaixo.
          </p>
        </div>

        <Card className="border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-neutral-900">
              Atrelar equipe
            </CardTitle>
            <CardDescription className="text-neutral-600">
              Escolha as opções e confirme.
            </CardDescription>
          </CardHeader>

          <TeamsEdictForm teams={teams} edicts={edicts} />
        </Card>
      </main>
    </div>
  );
}
