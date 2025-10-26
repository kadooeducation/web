import { HttpClientFactory } from "@/infra/external/http/axios/http-client-factory";
import { EdictGatewayHttp, edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http";
import { EditEdictSection } from "@/presentation/modules/edict/edit/components/edit-edict-section/edit-edict-section";
import { notFound } from "next/navigation";

export default async function EditEdictPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {

  const { id } = await params

  const client = HttpClientFactory.create()
  const gateway = new EdictGatewayHttp(client)

  const edict = await gateway.getById(Number(id))

  if (!edict) return notFound()

  return (
    <EditEdictSection edict={edict} />
  )
}