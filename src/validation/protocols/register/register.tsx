import { registerValidation } from "@/validation/validators/register/register-validation";
import z from "zod";

export type RegisterValidation = z.infer<typeof registerValidation>