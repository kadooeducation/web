export enum EdictStatusEnum {
  EM_ANDAMENTO = "EM_ANDAMENTO",
  ABERTO = "ABERTO",
  ENCERRADO = "ENCERRADO",
}

export const EDICT_STATUS_LABELS: Record<EdictStatusEnum, string> = {
  [EdictStatusEnum.EM_ANDAMENTO]: "Em andamento",
  [EdictStatusEnum.ABERTO]: "Aberto",
  [EdictStatusEnum.ENCERRADO]: "Encerrado",
};