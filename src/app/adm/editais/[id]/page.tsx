
import { Button } from "@/presentation/external/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/external/components/ui/card"
import { Separator } from "@/presentation/external/components/ui/separator"

import { Footprints, PlusCircle, Calendar as CalIcon, Clock3, Link2, MapPin } from "lucide-react"
import { EdictGatewayHttp, edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http"
import { notFound } from "next/navigation"
import { CreateInPersonEventDialog } from "@/presentation/modules/step-by-id/components/create/create-in-person-event-dialog"
import { CreateOnlineEventDialog } from "@/presentation/modules/step-by-id/components/create/create-online-event-dialog"
import { CreateActivityDialog } from "@/presentation/modules/step-by-id/components/create/create-activity-dialog"
import { StepGatewayHttp, stepGatewayHttp } from "@/infra/modules/step/step-gateway-http"
import { createInPersonStepAction } from "./(actions)/create-in-person-step-action"
import { StepCard } from "@/presentation/modules/step-by-id/components/view/step-card"
import { EventStepCard } from "@/presentation/modules/step-by-id/components/view/event-step-card"
import { Fragment } from "react"
import { ActivityStepCard } from "@/presentation/modules/step-by-id/components/view/activity-step-card"
import { HttpClientFactory } from "@/infra/external/http/axios/http-client-factory"

type PageProps = {
  params: Promise<{ id: number }>
}

export default async function EdictByIdPage({ params }: PageProps) {

  const client = HttpClientFactory.create()
  const edictGateway = new EdictGatewayHttp(client)

  const stepGateway = new StepGatewayHttp(client)


  const { id } = await params

  const edict = await edictGateway.getById(id)

  const steps = await stepGateway.getByEdictId(id)

  if (!edict) notFound()

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Detalhes do Edital</h1>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-md text-gray-950 font-semibold">Edital: {edict?.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline">Editar edital</Button>

            <Button variant="ghost" asChild>
              <a href="/adm/editais">Voltar</a>
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Footprints className="w-5 h-5 text-[#5127FF]" />
              Etapas do Edital
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <CreateInPersonEventDialog edictId={Number(id)} onCreateStepAction={createInPersonStepAction}>
                <Button className="bg-[#5127FF] hover:bg-[#5127FF]/90">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Evento Presencial
                </Button>
              </CreateInPersonEventDialog>

              <CreateOnlineEventDialog edictId={Number(id)}>
                <Button className="bg-[#5127FF] hover:bg-[#5127FF]/90">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Evento Online
                </Button>
              </CreateOnlineEventDialog>

              <CreateActivityDialog edictId={Number(id)}>
                <Button variant="outline" className="border-[#5127FF]">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Adicionar Atividade
                </Button>
              </CreateActivityDialog>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {steps.length > 0 ? (
                steps?.map((step: any) => (
                  <Fragment key={step.id}>
                    {step?.kind === "event" && (
                      <EventStepCard step={step} />
                    )}

                    {step?.kind === "activity" && (
                      <ActivityStepCard step={step} />
                    )}
                    {/* <StepCard step={step} key={step.id} /> */}
                  </Fragment>
                ))
              ) : (
                <div className="mt-4 col-span-2 w-full">
                  <div className="text-center text-sm text-gray-600 p-6 border border-dashed rounded-lg">
                    Nenhuma etapa adicionada ainda.
                    <div className="mt-2">Use os botões acima para criar Evento ou Atividade.</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


