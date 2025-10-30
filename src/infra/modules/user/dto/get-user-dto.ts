import type { ProfileEnum } from "@/business/domain/enum/enum-profile"

export interface GetUserDTO {
  id: string
  name: string
  role: ProfileEnum
}
