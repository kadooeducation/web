import { createEdictValidation } from "@/validation/validators/create-edict/create-edict-validation";
import z from "zod";

export type CreateEdictValidation = z.infer<typeof createEdictValidation>