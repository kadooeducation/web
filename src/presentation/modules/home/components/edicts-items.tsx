"use client";

import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Edict } from "@/business/domain/edict";
import { Card, CardContent } from "@/presentation/external/components/ui/card";
import { formatDate } from "@/shared/functions/format-date";
import { StatusEdictBadge } from "../../../shared/layout/components/status-edict-badge";

interface EdictItemsProps {
  edict: Edict;
}

const configDate: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "long",
  year: "numeric",
};

export function EdictItems({ edict }: EdictItemsProps) {
  const { push } = useRouter();

  return (
    <Card
      key={edict.id}
      className="group hover:cursor-pointer relative border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden hover:-translate-y-1 bg-white"
      onClick={() => push(`/edital/${edict.id}`)}
    >
      <CardContent className="p-6 space-y-5 relative z-10">
        <div className="flex flex-col gap-1">
          <div className="inline-flex justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#5127FF] transition-colors duration-300">
              {edict.title}
            </h3>
            <StatusEdictBadge status={edict.status} />
          </div>

          <p
            className="text-gray-600 text-sm leading-relaxed line-clamp-2"
            title={edict.description}
          >
            {edict.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {edict.categories?.map((category) => (
            <span
              key={category}
              className="bg-[#F4F0FF] text-[#5127FF] text-xs font-medium px-3 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-gray-100 transition-colors duration-300">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-[#5127FF]" />
            <span>{formatDate(edict.startDate, configDate)}</span>
          </div>
          <span className="text-gray-500 text-sm">até</span>
          <div className="flex items-center gap-2 text-sm">
            <span>{formatDate(edict.endDate, configDate)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
