"use server";

import { revalidatePath } from "next/cache";
import { kyClient } from "@/infra/external/http/ky-client/api";

export async function createInPersonStepAction(
  edictId: number,
  input: {
    title: string;
    date: Date;
    modality: "Presencial";
    address: string;
    description: string;
    time: string;
  }
) {
  await kyClient.post(`event/in-person`, {
    title: input.title,
    date: input.date,
    mode: input.modality,
    address: input.address,
    format: "Evento",
    description: input.description,
    time: input.time,
    edictId,
  });

  revalidatePath(`/adm/editais/${edictId}`);
}
