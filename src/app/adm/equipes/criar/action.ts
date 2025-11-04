"use server";

import { HTTPError } from "ky";
import { z } from "zod";
import { kyClient } from "@/infra/external/http/ky-client/api";

const schema = z.object({
  name: z.string().min(2, "Nome da equipe muito curto"),
});

export async function createTeamAction(data: FormData) {
  const result = schema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = z.treeifyError(result.error);

    return {
      success: false,
      message: null,
      errors,
    };
  }

  const team = result.data;

  console.log(team);

  try {
    await kyClient.post("teams", {
      name: team.name,
    });

    return {
      success: true,
      message: "Equipe criada com sucesso!",
      errors: null,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      const data = await error.response.json().catch(() => null);
      return {
        success: false,
        message: data?.message ?? "Erro ao criar equipe.",
        errors: null,
      };
    }

    return {
      success: false,
      message: "Erro inesperado. Tente novamente.",
      errors: null,
    };
  }
}
