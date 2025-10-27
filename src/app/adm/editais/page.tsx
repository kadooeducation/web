import { kyClient } from "@/infra/external/http/ky-client/api"
import { AdmEdictsTable } from "@/presentation/modules/adm/adm-edicts-table"

export default async function AdminEdictsPage() {

  const edicts = await kyClient.get<{
    id: number
    status: string
    categories: string[]
    title: string
    description: string
    startDate: Date
    endDate: Date
  }[]>("edict")

  return (
    <AdmEdictsTable edicts={edicts} />
  )
}
