"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, X, ArrowLeft, ExternalLink, MapPin, Briefcase, CalendarDays, Globe2, Languages } from "lucide-react"

import { Card, CardContent } from "@/presentation/external/components/ui/card"
import { Button } from "@/presentation/external/components/ui/button"
import { Badge } from "@/presentation/external/components/ui/badge"
import { Separator } from "@/presentation/external/components/ui/separator"
import { Textarea } from "@/presentation/external/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/presentation/external/components/ui/avatar"



type Experience = { role: string; org: string; start: string; end?: string }
type PortfolioItem = { title: string; url: string }
type MentorProfile = {
  id: number | string
  name: string
  area: string
  years: number
  tags: string[]
  bio: string
  skills: string[]
  location?: string
  languages?: string[]
  availability?: string
  linkedin?: string
  website?: string
  portfolio?: PortfolioItem[]
  experiences?: Experience[]
  appliedAt?: string
  status?: "PENDING" | "APPROVED" | "REJECTED"
}

const mockFetchMentor = async (id: string): Promise<MentorProfile | null> => {
  await new Promise(r => setTimeout(r, 300))
  const m = {
    id,
    name: "Ana Silva",
    area: "Produto",
    years: 8,
    tags: ["Discovery", "Métricas", "OKRs"],
    bio:
      "Profissional de Produto com 8 anos em discovery, métricas e growth. Já liderei squads em marketplaces e edtechs. Gosto de estruturar do zero e acelerar PMs/Founders no early stage.",
    skills: ["Product Discovery", "Experimentos", "JTBD", "Roadmapping", "Métricas (AARRR)"],
    location: "São Luís - MA",
    languages: ["Português (nativo)", "Inglês (avançado)"],
    availability: "2h/semana para mentorias",
    linkedin: "https://www.linkedin.com/in/ana-silva",
    website: "https://ana-silva.com",
    portfolio: [
      { title: "Case: redução de churn em 27%", url: "https://docs.google.com/..." }
    ],
    experiences: [
      { role: "Group PM", org: "EdTech X", start: "2022", end: "2025" },
      { role: "PM", org: "Marketplace Y", start: "2019", end: "2022" },
      { role: "PO", org: "Startup Z", start: "2017", end: "2019" },
    ],
    appliedAt: "10/08/2025",
    status: "PENDING" as const,
  }
  return m
}

export default function AvaliableMentorProfilePage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const [mentor, setMentor] = useState<MentorProfile | null>(null)
  const [notes, setNotes] = useState("")
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    let active = true
      ; (async () => {
        // Trocar pelo gateway real
        const data = await mockFetchMentor(id)
        if (active) setMentor(data)
      })()
    return () => {
      active = false
    }
  }, [id])

  const initials = useMemo(() => {
    if (!mentor?.name) return "M"
    return mentor.name
      .split(" ")
      .map((n) => n[0]?.toUpperCase())
      .slice(0, 2)
      .join("")
  }, [mentor?.name])

  async function handleApprove() {
    if (!mentor) return
    startTransition(async () => {
      // await mentorGatewayHttp.approve(mentor.id, { notes })
      setMentor({ ...mentor, status: "APPROVED" })
    })
  }

  async function handleReject() {
    if (!mentor) return
    startTransition(async () => {
      // await mentorGatewayHttp.reject(mentor.id, { notes })
      setMentor({ ...mentor, status: "REJECTED" })
    })
  }

  if (!mentor) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-64 bg-gray-200 rounded" />
            <div className="h-24 w-full bg-gray-200 rounded" />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt={mentor.name} />
              <AvatarFallback className="bg-[#5127FF] text-white">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{mentor.name}</h1>
                <Badge className="bg-[#5127FF] text-white">{mentor.area}</Badge>

              </div>
              <p className="text-sm text-gray-600">
                Candidatou-se em <span className="font-medium">{mentor.appliedAt}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Sobre</h2>
              <p className="text-gray-700 leading-relaxed">{mentor.bio}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Experiências
              </h2>
              <div className="space-y-3">
                {mentor.experiences?.map((exp, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <p className="font-medium text-gray-900">{exp.role}</p>
                      <p className="text-sm text-gray-600">{exp.org}</p>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      {exp.start} — {exp.end ?? "Atual"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {mentor.portfolio && mentor.portfolio.length > 0 && (
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Portfólio</h2>
                <div className="space-y-2">
                  {mentor.portfolio.map((p, i) => (
                    <Link
                      key={i}
                      href={p.url}
                      target="_blank"
                      className="text-[#5127FF] hover:opacity-80 inline-flex items-center gap-2"
                    >
                      {p.title} <ExternalLink className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Informações</h2>
              <div className="space-y-3 text-sm text-gray-700">
                {mentor.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {mentor.location}
                  </div>
                )}
                {mentor.languages && mentor.languages.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4" /> {mentor.languages.join(" · ")}
                  </div>
                )}
                {mentor.availability && (
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4" /> {mentor.availability}
                  </div>
                )}
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((s) => (
                  <Badge key={s} variant="outline" className="font-normal">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Aprovação</h2>
              <Textarea
                placeholder="Notas internas (só admins veem)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="flex flex-wrap gap-2">
                {mentor.linkedin && (
                  <Link href={mentor.linkedin} target="_blank" className="w-full">
                    <Button variant="outline" className="w-full justify-center">
                      Ver LinkedIn <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
                {mentor.website && (
                  <Link href={mentor.website} target="_blank" className="w-full">
                    <Button variant="outline" className="w-full justify-center">
                      Website <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent text-green-700 hover:bg-green-50 border-green-200"
                  onClick={handleApprove}
                  disabled={isPending || mentor.status === "APPROVED"}
                >
                  <Check className="w-4 h-4 mr-2" /> Aprovar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-red-700 border-red-200 hover:bg-red-50"
                  onClick={handleReject}
                  disabled={isPending || mentor.status === "REJECTED"}
                >
                  <X className="w-4 h-4 mr-2" /> Reprovar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}