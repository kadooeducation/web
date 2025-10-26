
import { EdictGatewayHttp, edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http"
import { EdictDetailsSection } from "@/presentation/modules/edict/view/components/edict-details/edict-details"
import { notFound } from "next/navigation"
import { HttpClientFactory } from "@/infra/external/http/axios/http-client-factory"
import { Metadata } from "next"

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const client = HttpClientFactory.create()
  const gateway = new EdictGatewayHttp(client)

  const edict = await gateway.getById(Number(params.id))

  if (!edict) {
    return {
      title: "Edital não encontrado - Kadoo Academy",
    }
  }

  return {
    title: `${edict.title} - Kadoo Academy`,
    description: `Detalhes do edital ${edict.title}`,
  }
}

export default async function EdictDetailsPage({
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
    <EdictDetailsSection edict={edict} />
  )
}