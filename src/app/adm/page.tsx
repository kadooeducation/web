import Link from "next/link";
import { Suspense } from "react";
import type { Edict } from "@/business/domain/edict";
import { kyClient } from "@/infra/external/http/ky-client/api";
import { Button } from "@/presentation/external/components/ui/button";
import { Card, CardContent } from "@/presentation/external/components/ui/card";
import {
  SidebarInset,
  SidebarProvider,
} from "@/presentation/external/components/ui/sidebar";
import { ApplicantsBarChart } from "@/presentation/modules/home/components/applicants-bar-chart";
import { EdictsList } from "@/presentation/modules/home/components/edicts-list";
import { MentorAreasPieChart } from "@/presentation/modules/home/components/mentors-areas-pie-chart";
import { Skeleton } from "@/presentation/shared/layout/components/skeleton/skeleton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const edicts = await kyClient.get<Edict[]>("edict");

  return (
    <div className="min-h-screen">
      <SidebarProvider>
        <SidebarInset>
          <main className="p-6 space-y-8 min-h-screen">
            <div className="flex flex-col gap-2">
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Editais Cadastrados
                    </h2>
                    <p className="text-gray-600">
                      Acompanhe, edite e publique novos editais.
                    </p>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white"
                  >
                    <Link href="/adm/editais">Ver todos</Link>
                  </Button>
                </div>

                <Suspense fallback={<Skeleton.EdictsList />}>
                  <EdictsList edicts={edicts} />
                </Suspense>
              </section>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
              <Card className="bg-white shadow-sm lg:col-span-2 2xl:col-span-3">
                <CardContent className="p-4">
                  <ApplicantsBarChart />
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <MentorAreasPieChart />
                </CardContent>
              </Card>

              {/* <Card className="bg-white shadow-sm lg:col-span-2 2xl:col-span-2">
                <CardContent className="p-4">
                  <PendingMentorsList />
                </CardContent>
              </Card> */}
            </div>
          </main>

          <footer className="mt-12 p-6 bg-white border-t">
            <div className="text-center text-sm text-gray-600">
              <p>© 2025 Kadoo - Acelerando startups para transformar vidas</p>
              <p className="mt-1">
                Uma iniciativa para democratizar o empreendedorismo
              </p>
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
