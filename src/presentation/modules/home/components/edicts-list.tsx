import type { Edict } from "@/business/domain/edict";
import { EdictItems } from "./edicts-items";

interface EdictsListProps {
  edicts: Edict[];
}

export async function EdictsList({ edicts }: EdictsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {edicts?.map((edict) => (
        <EdictItems key={edict.id} edict={edict} />
      ))}
    </div>
  );
}
