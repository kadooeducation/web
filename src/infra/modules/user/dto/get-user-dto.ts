import { EnumProfile } from "@/presentation/shared/layout/components/profile/profile";

export interface GetUserDTO {
  id: string;
  name: string;
  role: EnumProfile
}