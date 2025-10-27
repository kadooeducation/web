import { kyClient } from "@/infra/external/http/ky-client/api";
import { EditEdictSection } from "@/presentation/modules/edict/edit/components/edit-edict-section/edit-edict-section";
import { notFound } from "next/navigation";

export default async function EditEdictPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {

  const { id } = await params

  const edict = await kyClient.get<{
    id: number
    status: string
    title: string
    description: string
    organizer: string
    file: string
    contact: string
    location: string
    startDate: Date
    endDate: Date
    categories: string[]
  }>(`edict/${id}`)

  if (!edict) return notFound()

  return (
    <EditEdictSection edict={edict} />
  )
}