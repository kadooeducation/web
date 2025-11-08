import { Calendar, FileText, Info, Link2, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { kyClient } from "@/infra/external/http/ky-client/api";
import type { Step } from "@/infra/modules/step/step-gateway";
import { Badge } from "@/presentation/external/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/external/components/ui/card";
import { Separator } from "@/presentation/external/components/ui/separator";
import { ActivityResponseForm } from "@/presentation/modules/step-by-id/components/view/activity-response-form";
import { BackToSteps } from "@/presentation/modules/step-by-id/components/view/back-to-steps";
import { EvaluationSection } from "@/presentation/modules/steps/view/components/evaluation-section";
import { formatDate } from "@/shared/functions/format-date";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const step = await kyClient.get<{
    id: number;
    title: string;
    description: string;
    date: Date;
    status: string;
    event: Event;
    kind: string;
    activity?: {
      dueDate: Date;
      file: string;
    };
  }>(`steps/${id}`);

  if (!step) {
    return {
      title: "Edital não encontrado - Kadoo Academy",
    };
  }

  return {
    title: `${step.title} - Kadoo Academy`,
    description: `Detalhes do edital ${step.title}`,
  };
}

export default async function StepsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { userAlreadyResponseActivity } = await kyClient.get<{
    userAlreadyResponseActivity: boolean;
  }>(`activity-response/${id}`);

  console.log(userAlreadyResponseActivity);

  const step = await kyClient.get<Step>(`steps/${id}`);

  if (!step) return notFound();

  const isEvento = step?.event?.format === "Evento";
  const isAtividade = step?.activity;

  console.log(step);

  function statusBadgeStyle(status: string) {
    if (status === "concluida")
      return "bg-green-100 text-green-700 border-green-200";
    if (status === "em_andamento")
      return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  }

  return (
    <div className="max-w-4xl py-10 space-y-8">
      {/* topo */}
      <div className="flex items-center justify-between gap-3">
        <BackToSteps />
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={`border ${statusBadgeStyle(step.status)}`}>
            {step.status === "concluida"
              ? "Concluída"
              : step.status === "em_andamento"
              ? "Em andamento"
              : "Pendente"}
          </Badge>
          <Badge className="border bg-[#5127FF]/10 text-[#5127FF] border-[#5127FF]/20">
            {step?.event?.format === "Evento" ? "Evento" : "Atividade"}
          </Badge>
          {isAtividade && step.activity?.dueDate ? (
            <Badge className="border bg-slate-50 text-slate-700 border-slate-200">
              Entrega até {formatDate(step.activity.dueDate)}
            </Badge>
          ) : null}
        </div>
      </div>

      <Card className="overflow-hidden border-slate-200">
        <CardHeader className="pb-3 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-[#5127FF]">
              {step.title}
            </CardTitle>
          </div>
          {step?.description ? (
            <p className="text-sm text-slate-600 flex items-start gap-2">
              <Info className="min-w-5 min-h-5 text-[#5127FF]" />
              {step.description}
            </p>
          ) : null}
        </CardHeader>

        {isEvento ? (
          <>
            <Separator />
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                {"date" in step && step.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#5127FF]" />
                    <span>
                      <span className="font-medium">Data: </span>
                      {formatDate(step.date)}
                    </span>
                  </div>
                )}

                {"mode" in step.event && step.event.mode && (
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#5127FF]" />
                    <span className="capitalize">
                      <span className="font-medium">Modalidade: </span>
                      {step.event.mode}
                    </span>
                  </div>
                )}

                {"mode" in step.event &&
                  step.event.format === "Presencial" &&
                  "address" in step.event &&
                  step.event.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#5127FF]" />
                      <span>
                        <span className="font-medium">Local: </span>
                        {step.event.address}
                      </span>
                    </div>
                  )}

                {"mode" in step.event &&
                  step.event.mode === "Online" &&
                  "meetingLink" in step.event &&
                  step.event.meetingLink && (
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-[#5127FF]" />
                      <a
                        href={step.event.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#5127FF] underline-offset-2 hover:opacity-90"
                      >
                        Acessar link da sessão
                      </a>
                    </div>
                  )}
              </div>
            </CardContent>
          </>
        ) : null}
      </Card>

      {isAtividade && !userAlreadyResponseActivity && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Sua entrega</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <ActivityResponseForm stepId={Number(id)} />
          </CardContent>
        </Card>
      )}

      {userAlreadyResponseActivity && (
        <Card className="border-slate-200 bg-green-50/40">
          <CardContent className="py-6 text-sm text-green-700">
            Você já enviou sua atividade! 🎉
          </CardContent>
        </Card>
      )}

      {isAtividade && !userAlreadyResponseActivity && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Sua entrega</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <ActivityResponseForm stepId={Number(id)} />
          </CardContent>
        </Card>
      )}

      <EvaluationSection stepId={1} />
    </div>
  );
}
