"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText, Mail, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  EDICT_STATUS_LABELS,
  type EdictStatusEnum,
} from "@/business/domain/enum/edict-status-enum";
import { Badge } from "@/presentation/external/components/ui/badge";
import { Button } from "@/presentation/external/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/external/components/ui/card";
import { Separator } from "@/presentation/external/components/ui/separator";
import { formatDate } from "@/shared/functions/format-date";

interface EdictDetailsSectionProps {
  edict: {
    id: number;
    status: EdictStatusEnum | string;
    title: string;
    description: string;
    file: string;
    startDate: Date;
    endDate: Date;
    organizer: string;
    contact: string;
    location: string;
    categories: string[];
  };
}

export function EdictDetailsSection({ edict }: EdictDetailsSectionProps) {
  const { push } = useRouter();

  const startDate = formatDate(edict.startDate);
  const endDate = formatDate(edict.endDate);

  const statusColor: Record<string, string> = {
    ABERTO: "bg-green-100 text-green-700",
    EM_ANDAMENTO: "bg-yellow-100 text-yellow-700",
    ENCERRADO: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]"
      >
        <div className="space-y-8">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusColor[edict.status] ?? "bg-gray-100 text-gray-700"
                }`}
              >
                {EDICT_STATUS_LABELS[edict.status as EdictStatusEnum] ??
                  "Status não informado"}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {edict.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {edict.categories?.map((category) => (
                <Badge
                  key={category}
                  className="bg-[#F4F0FF] text-[#5127FF] rounded-full px-4 py-1 text-xs font-medium"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="prose max-w-none prose-p:text-gray-600 prose-headings:text-gray-900">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {edict.description}
            </ReactMarkdown>
          </div>
        </div>

        <Card className="h-fit rounded-2xl border border-gray-100 shadow-sm sticky top-10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              Informações do edital
            </CardTitle>
            <p className="text-sm text-gray-500">
              Dados rápidos para você conferir antes de avançar.
            </p>
          </CardHeader>
          <CardContent className="space-y-5 text-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <Calendar className="w-4 h-4 text-[#5127FF]" />
                Período de inscrição
              </div>
              <p className="text-gray-500">
                • {startDate} até {endDate}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-800 font-medium">Organizador</p>
              <p className="text-gray-500">• {edict.organizer}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <MapPin className="w-4 h-4 text-[#5127FF]" />
                Local
              </div>
              <p className="text-gray-500">• {edict.location}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <Mail className="w-4 h-4 text-[#5127FF]" />
                Contato
              </div>
              <a
                href={`mailto:${edict.contact}`}
                className="text-gray-500 hover:underline break-all"
              >
                • {edict.contact}
              </a>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <FileText className="w-4 h-4 text-[#5127FF]" />
                Edital completo
              </div>
              <a
                href={edict.file}
                className="text-gray-500 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                • Ver PDF do edital
              </a>
            </div>

            <Separator />

            <Button
              className="w-full bg-[#F4DA02] hover:bg-[#e7cc01] text-black font-semibold transition-transform hover:scale-[1.01] rounded-xl hover:cursor-pointer"
              onClick={() => {
                push(`/etapas-do-edital/${edict.id}`);
              }}
            >
              Seguir para etapas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
