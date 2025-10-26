

import { HttpClientFactory } from "@/infra/external/http/axios/http-client-factory"
import { StepGatewayHttp, stepGatewayHttp } from "@/infra/modules/step/step-gateway-http"
import { StepsSection } from "@/presentation/modules/steps/view/components/steps-section"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Etapas do Edital - Kadoo Academy",
  description: "Etapas do Edital",
};

export default async function StepsEdictPage({ params }: { params: { id: string } }) {
  const { id } = await params

  const client = HttpClientFactory.create()
  const stepGateway = new StepGatewayHttp(client)

  const steps = await stepGateway.getByEdictId(Number(id))

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#5127FF] mb-2">Etapas do edital</h1>
        <p className="text-muted-foreground">
          Acompanhe as etapas disponíveis neste edital.
        </p>
      </div>

      <StepsSection steps={steps} />
    </div>
  )
}
