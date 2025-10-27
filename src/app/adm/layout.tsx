import { kyClient } from "@/infra/external/http/ky-client/api";
import { SidebarProvider } from "@/presentation/external/components/ui/sidebar";
import { AdminSidebar } from "@/presentation/shared/layout/components/admin-sidebar/admin-sidebar";
import { Navbar } from "@/presentation/shared/layout/components/navbar/navbar";
import { cookies } from "next/headers";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  const user = await kyClient.get<{ name: string }>("me")

  const initial = user.name[0]

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSidebar />
      <main className="w-full">
        <Navbar initial={initial} />
        <div className="px-4">{children}</div>
      </main>
    </SidebarProvider>
  )
}