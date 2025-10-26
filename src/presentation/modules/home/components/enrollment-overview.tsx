import { EdictItems } from "./edicts-items/edicts-items";
import { HttpClientFactory } from "@/infra/external/http/axios/http-client-factory";
import { EdictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http";

export async function EnrollmentOverview() {

  const client = HttpClientFactory.create();
  const edictGatewayHttp = new EdictGatewayHttp(client);

  const edicts = await edictGatewayHttp.edictsAttachUser();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {edicts?.map((edict) => (
        <EdictItems key={edict.id} edict={edict} />
      ))}
    </div>
  )
}