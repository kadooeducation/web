import { loginValidation } from "@/validation/validators/login/login-validation";
import z from "zod";

export type LoginValidation = z.infer<typeof loginValidation>