import {
  Card
} from "@/presentation/external/components/ui/card";
import { CreateTeamForm } from "@/presentation/modules/adm/teams/create/create-team-form";

export default function CreateTeamPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-3xl px-4 py-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">
            Criar equipe
          </h2>
        </div>

        <Card className="border-neutral-200 shadow-sm">
          <CreateTeamForm />
        </Card>
      </main>
    </div>
  );
}
