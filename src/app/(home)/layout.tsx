import type { Metadata } from "next";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/presentation/external/components/ui/sidebar";
import { cookies } from "next/headers";
import { AppSidebar } from "@/presentation/shared/layout/components/app-sidebar/app-sidebar";
import { Navbar } from "@/presentation/shared/layout/components/navbar/navbar";
import { kyClient } from "@/infra/external/http/ky-client/api";

export const metadata: Metadata = {
  title: "Início",
  description: "Página de Início",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  const user = await kyClient.get<{ acronym: string }>("me")


  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <Navbar initial={user.acronym} />
        <div className="px-4">{children}</div>
      </main>
      <Toaster richColors position="top-right" />
    </SidebarProvider>
  )
}