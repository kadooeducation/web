"use server";

import { revalidatePath } from "next/cache";
import { kyClient } from "@/infra/external/http/ky-client/api";

export async function deleteEdictAction(edictId: number) {
  await kyClient.delete(`steps/${edictId}`);

  revalidatePath("/adm/editais]", "page");
}
