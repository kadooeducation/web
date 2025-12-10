import { Suspense } from "react";
import type { Edict } from "@/business/domain/edict";
import { kyClient } from "@/infra/external/http/ky-client/api";
import { Button } from "@/presentation/external/components/ui/button";
import { Skeleton } from "@/presentation/shared/components/layout/components/skeleton/skeleton";
import { EdictsList } from "./edicts-list";
import { WelcomeBanner } from "./welcome-banner";

export async function HomeSection() {
  const edicts = await kyClient.get<Edict[]>("user-edicts");

  return (
    <div className="min-h-screen">
      <section className="p-6 space-y-8 min-h-screen">
        <WelcomeBanner />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-gray-900">Seus Editais</h2>
              <p className="text-gray-600">
                Acompanhe os programas em que você está participando.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white transition-all duration-300 font-semibold px-6"
            >
              Ver todos
            </Button>
          </div>
          <Suspense fallback={<Skeleton.EdictsList />}>
            <EdictsList edicts={edicts} />
          </Suspense>
        </div>
      </section>

      <footer className="mt-12 p-6 bg-white border-t">
        <div className="text-center text-sm text-gray-600">
          <p>© 2025 Kadoo — Impulsionando ideias, transformando futuros.</p>
          <p className="mt-1">
            Uma iniciativa que conecta pessoas e oportunidades para acelerar o
            empreendedorismo de impacto.
          </p>
        </div>
      </footer>
    </div>
  );
}
