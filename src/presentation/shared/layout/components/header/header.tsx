import { SidebarTrigger } from "@/presentation/external/components/ui/sidebar";

import { ReactNode } from "react";


interface HeaderProps {
  profile: ReactNode
}

export function Header({ profile }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-6 bg-white border-b border-[#000]/10">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo de volta, Pedro!</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {profile}
      </div>
    </header>
  )
}