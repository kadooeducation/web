import { Calendar, MapPin, Sparkles, Users } from "lucide-react";
import { Card, CardContent } from "@/presentation/external/components/ui/card";
import { formatDate } from "@/shared/functions/format-date";
import { kyClient } from "@/infra/external/http/ky-client/api";
import type { Edict } from "@/business/domain/edict";

const MOCK_EDITAIS = [
  {
    id: 1,
    title: "Programa de Inovação 2025",
    description:
      "Edital voltado para startups que promovem impacto social através da tecnologia.",
    startDate: "2025-11-10",
    endDate: "2026-02-10",
    organizer: "Kadoo Academy",
    contact: "contato@kadoo.com",
    file: "https://example.com/edital-inovacao.pdf",
    status: "EM_ANDAMENTO",
    location: "São Luís - MA",
    categories: ["Tecnologia", "Impacto Social", "Sustentabilidade"],
  },
  {
    id: 2,
    title: "Aceleração Jovem Empreendedor",
    description:
      "Para quem está começando e quer validar a ideia com mentoria e comunidade.",
    startDate: "2025-12-01",
    endDate: "2026-03-15",
    organizer: "Kadoo Academy",
    contact: "contato@kadoo.com",
    file: "https://example.com/edital-aceleracao.pdf",
    status: "ABERTO",
    location: "Online",
    categories: ["Empreendedorismo", "Comunidade"],
  },
  {
    id: 3,
    title: "Desafio de Impacto Norte/Nordeste",
    description:
      "Conectando jovens fundadores da região com oportunidades e editais.",
    startDate: "2026-01-05",
    endDate: "2026-04-05",
    organizer: "Kadoo Academy",
    contact: "contato@kadoo.com",
    file: "https://example.com/edital-impacto.pdf",
    status: "ENCERRADO",
    location: "Híbrido",
    categories: ["Impacto Social", "Região Nordeste"],
  },
];

const STATUS_LABELS: Record<string, string> = {
  EM_ANDAMENTO: "Em andamento",
  ABERTO: "Inscrições abertas",
  ENCERRADO: "Encerrado",
};

const STATUS_STYLES: Record<string, string> = {
  EM_ANDAMENTO: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100",
  ABERTO: "bg-green-50 text-green-700 ring-1 ring-green-100",
  ENCERRADO: "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
};

async function getAllEdicts() {
  const edicts = await kyClient.get<Edict[]>("edict")

  return edicts
}


export default async function EditaisPage() {

  const edicts = await getAllEdicts()

  return (
    <div className="">
      <div className="p-6 min-h-screen">
        <Card className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 text-white border-0 shadow-xl mb-6 rounded-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm w-fit">
                <Sparkles className="w-4 h-4" />
                Novas oportunidades chegando
              </span>
              <h1 className="text-4xl font-bold tracking-tight">
                Editais disponíveis
              </h1>
              <p className="text-white/85 max-w-2xl text-base">
                Escolha um edital para se conectar com mentores, comunidade e
                acelerar sua ideia dentro da Kadoo.
              </p>
              <div className="flex gap-4 flex-wrap text-sm text-white/90">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                  <Users className="w-4 h-4" />
                  {MOCK_EDITAIS.length} editais atuais
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                  <Calendar className="w-4 h-4" />
                  Atualizado para 2025
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {edicts.map((edital) => {
            const statusLabel = STATUS_LABELS[edital.status] ?? edital.status;
            const statusStyle = STATUS_STYLES[edital.status] ?? "bg-slate-100";

            return (
              <Card
                key={edital.id}
                className="relative overflow-hidden border-0 shadow-sm rounded-2xl bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusStyle}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current/70"></span>
                    {statusLabel}
                  </span>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="space-y-1 pr-16">
                    <h2 className="text-lg font-semibold text-slate-900 leading-tight">
                      {edital.title}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Organizado por {edital.organizer}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {edital.description}
                  </p>

                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4 text-[#5127FF]" />
                      <span>
                        {formatDate(edital.startDate)}{" "}
                        - {new Date(edital.endDate).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-[#5127FF]" />
                      <span>{edital.location}</span>
                    </div>
                  </div>

                  {edital.categories?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {edital.categories.map((cat) => (
                        <span
                          key={cat}
                          className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

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
