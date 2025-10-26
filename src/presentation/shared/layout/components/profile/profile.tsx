import { Avatar, AvatarFallback, AvatarImage } from "@/presentation/external/components/ui/avatar";

interface ProfileProps {
  name: string
  role: EnumProfile
}

export enum EnumProfile {
  ROLE_STUDENT = "ROLE_STUDENT",
  ROLE_MENTOR = "ROLE_MENTOR",
  ROLE_ENTERPRISE = "ROLE_ENTERPRISE",
  ROLE_ADMIN = "ROLE_ADMIN"
}

export function Profile({ name, role }: ProfileProps) {

  const ROLE_USER = {
    [EnumProfile.ROLE_STUDENT]: "Estudante",
    [EnumProfile.ROLE_MENTOR]: "Mentor",
    [EnumProfile.ROLE_ENTERPRISE]: "Empresa",
    [EnumProfile.ROLE_ADMIN]: "Administrador"
  }

  const firstLetter = name?.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="/placeholder.svg?height=40&width=40" />
        <AvatarFallback className="bg-[#5127FF] text-white">{firstLetter}</AvatarFallback>
      </Avatar>
      <div className="hidden md:block">
        <p className="font-medium text-gray-900">{name}</p>
        <p className="text-sm text-gray-600">{ROLE_USER[role]}</p>
      </div>
    </div>
  )
}