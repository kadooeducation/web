import { kyClient } from '@/infra/external/http/ky-client/api'
import { KadooEdictsTable } from '@/presentation/modules/adm/adm-edicts-table'

export const dynamic = 'force-dynamic'

export default async function AdminEdictsPage() {
  const edicts =
    await kyClient.get<
      {
        id: number
        status: string
        categories: string[]
        title: string
        description: string
        organizer: string
        startDate: Date
        endDate: Date
      }[]
    >('edict')

    console.log(edicts)

  return <KadooEdictsTable edicts={edicts} />
}
