import { kyClient } from "@/infra/external/http/ky-client/api";
import { EdictItems } from "./edicts-items";

export async function EnrollmentOverview() {
  const edicts = await kyClient.get<
    {
      id: number;
      status: string;
      title: string;
      description: string;
      organizer: string;
      file: string;
      contact: string;
      location: string;
      startDate: Date;
      endDate: Date;
      categories: string[];
    }[]
  >("user-edicts");

  console.log(edicts);
  // const edicts = await edictGatewayHttp.edictsAttachUser();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {edicts?.map((edict) => (
        <EdictItems key={edict.id} edict={edict} />
      ))}
    </div>
  );
}
