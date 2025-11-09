import {
  EDICT_STATUS_LABELS,
  EdictStatusEnum,
} from "@/business/domain/enum/edict-status-enum";
import { Badge } from "@/presentation/external/components/ui/badge";

interface StatusBadgeProps {
  status: EdictStatusEnum;
}

export function StatusEdictBadge({ status }: StatusBadgeProps) {
  const variants: Record<EdictStatusEnum, string> = {
    [EdictStatusEnum.ABERTO]: "bg-green-100 text-green-700",
    [EdictStatusEnum.EM_ANDAMENTO]: "bg-yellow-100 text-yellow-700",
    [EdictStatusEnum.ENCERRADO]: "bg-red-100 text-red-700",
  };

  return (
    <Badge
      className={`px-3 py-1 rounded-full text-xs font-medium ${variants[status]}`}
    >
      {EDICT_STATUS_LABELS[status]}
    </Badge>
  );
}
