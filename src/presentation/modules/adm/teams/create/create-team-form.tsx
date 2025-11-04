"use client"

import { Loader2, Users } from "lucide-react";
import { createTeamAction } from "@/app/adm/equipes/criar/action";
import { Button } from "@/presentation/external/components/ui/button";
import {
  CardContent,
  CardFooter,
} from "@/presentation/external/components/ui/card";
import { Input } from "@/presentation/external/components/ui/input";
import { Label } from "@/presentation/external/components/ui/label";
import { useFormState } from "@/shared/hooks/use-form-state";

export function CreateTeamForm() {
  const [formState, handleSubmit, isPending] = useFormState({
    action: createTeamAction,
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome da equipe *</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ex.: Equipe Kadoo"
            className="focus-visible:ring-2 focus-visible:ring-offset-2"
          />
          {formState?.errors?.properties ? (
            <p className="text-sm text-red-600">
              {formState.errors.properties.name.errors[0]}
            </p>
          ) : null}
        </div>

        {formState.message ? (
          <p
            className={
              formState.success
                ? "text-green-600 text-sm"
                : "text-red-600 text-sm"
            }
          >
            {formState.message}
          </p>
        ) : null}
      </CardContent>

      <CardFooter className="flex justify-end gap-3 mt-6">
        <Button type="reset" variant="outline">
          Limpar
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          style={{ backgroundColor: "#5127FF", color: "#fff" }}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Salvando
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Criar equipe
            </span>
          )}
        </Button>
      </CardFooter>
    </form>
  );
}
