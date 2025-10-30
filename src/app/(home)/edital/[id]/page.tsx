import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { kyClient } from '@/infra/external/http/ky-client/api'
import { EdictDetailsSection } from '@/presentation/modules/edict/view/components/edict-details/edict-details'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
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

  if (!edict) {
    return {
      title: 'Edital não encontrado - Kadoo Academy',
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

  return <EdictDetailsSection edict={edict} />
}
