import type { ProfileEnum } from "@/business/domain/enum/profile-enum";

export interface GetUserDTO {
  id: string;
  name: string;
  role: ProfileEnum;
}
