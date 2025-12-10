import { cookies } from "next/headers";
import { kyClient } from "@/infra/external/http/ky-client/api";
import { SidebarProvider } from "@/presentation/external/components/ui/sidebar";
import { AdminSidebar } from "@/presentation/shared/components/layout/components/admin-sidebar/admin-sidebar";
import { Navbar } from "@/presentation/shared/components/layout/components/navbar/navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSidebar />
      <main className="w-full">
        <Navbar title="Área do Administrador" />
        <div className="px-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
