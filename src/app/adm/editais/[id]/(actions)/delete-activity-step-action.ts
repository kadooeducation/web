"use server";

import { revalidatePath } from "next/cache";
import { kyClient } from "@/infra/external/http/ky-client/api";

export async function deleteActivityStepAction(stepId: number) {
  await kyClient.delete(`steps/${stepId}`);

  revalidatePath("/adm/editais]", "page");

}
