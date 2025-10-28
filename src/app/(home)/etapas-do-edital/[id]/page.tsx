

import type { Step } from "@/infra/modules/step/step-gateway";

import { kyClient } from "@/infra/external/http/ky-client/api";
import { StepsSection } from "@/presentation/modules/steps/view/components/steps-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Etapas do Edital - Kadoo Academy",
  description: "Etapas do Edital",
};

export default async function StepsEdictPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params


  const steps = await kyClient.get<Step[]>(`steps/edict/${id}`)

  return (
    <div className="min-h-screen bg-white py-12">
      <StepsSection steps={steps} />
    </div>
  )
}
