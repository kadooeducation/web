"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/presentation/external/components/ui/button"
import { Input } from "@/presentation/external/components/ui/input"
import { Card } from "@/presentation/external/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/presentation/external/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/presentation/external/components/ui/table"
import { Pencil, Trash2, Plus, Search } from "lucide-react"
import { edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/presentation/external/components/ui/dialog"
import { Label } from "@/presentation/shared/components"

const PAGE_SIZE = 6

export const statusColorMap: Record<string, string> = {
  "Aberto": "bg-green-100 text-green-700",
  "Encerrado": "bg-red-100 text-red-700",
  "Em breve": "bg-yellow-100 text-yellow-700",
}

export const edictsMock = [
  {
    id: "e1",
    title: "Edital Inovação 2025",
    description: "Aceleração de startups com foco em impacto social.",
    category: "Aceleração",
    startDate: "01/08/2025",
    endDate: "30/09/2025",
    status: "Aberto",
    createdAt: "2025-08-10T10:00:00Z",
    icon: "🚀",
  },
  {
    id: "e2",
    title: "Edital Tech Nordeste",
    description: "Fomento a soluções em educação e saúde.",
    category: "Fomento",
    startDate: "15/07/2025",
    endDate: "15/09/2025",
    status: "Aberto",
    createdAt: "2025-08-05T10:00:00Z",
    icon: "💡",
  },
  {
    id: "e3",
    title: "Bolsa P&D",
    description: "Pesquisa aplicada com bolsas para squads universitários.",
    category: "Pesquisa",
    startDate: "10/06/2025",
    endDate: "10/08/2025",
    status: "Encerrado",
    createdAt: "2025-07-20T10:00:00Z",
    icon: "🧪",
  },
  {
    id: "e4",
    title: "Desafio GovTech",
    description: "Soluções de gov digital e serviços públicos.",
    category: "Desafio",
    startDate: "20/08/2025",
    endDate: "20/10/2025",
    status: "Em breve",
    createdAt: "2025-08-18T10:00:00Z",
    icon: "🏛️",
  },
]

export default function AdminEdictsPage() {

  const [edicts, setEdicts] = useState<{
    id: number
    status: string
    categories: string[]
    title: string
    description: string
    startDate: Date
    endDate: Date
  }[] | null>(null)

  const getAllEdicts = useCallback(async () => {
    await edictGatewayHttp.getAll().then(setEdicts)
  }, [])

  useEffect(() => {

    getAllEdicts()
  }, [getAllEdicts])

  const [items, setItems] = useState([...edictsMock])
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(e => {
      const matchQ =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      return matchQ
    })
  }, [items, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  function handleDelete(id: number) {


    // if (confirm("Deseja excluir este edital?")) {
    //   setItems(prev => prev.filter(e => e.id !== id))
    // }
  }

  return (
    <Dialog>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gerenciamento de Editais</h1>
            <p className="text-gray-600">Busque, filtre e gerencie os editais</p>
          </div>
          <Button asChild className="bg-[#5127FF] hover:bg-[#5127FF]/90">
            <Link href="/adm/criar-edital" className="text-white">
              <Plus className="w-4 h-4 mr-2" />
              Criar edital
            </Link>
          </Button>
        </div>

        <Card className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 items-center w-full md:w-1/2">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar por título, descrição ou categoria..."
                  className="pl-9"
                  value={query}
                  onChange={(e) => {
                    setPage(1)
                    setQuery(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Select
                value={status}
                onValueChange={(v) => {
                  setPage(1)
                  setStatus(v as any)
                }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                  <SelectItem value="Fechado">Fechado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Título</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Status</TableHead>
                {/* <TableHead>Gerenciar Etapas</TableHead> */}
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {edicts?.map((e) => (
                <TableRow key={e.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{e.title}</TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-700">{new Date(e.startDate).toLocaleDateString()}</span>
                    <span className="mx-1 text-gray-400">até</span>
                    <span className="text-sm text-gray-700">{new Date(e.endDate).toLocaleDateString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColorMap[e.status]}`}>
                      {e.status}
                    </span>
                  </TableCell>
                  {/* <TableCell>
                    <Link href={""} className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColorMap[e.status]}`}>
                      Gerenciar etapas
                    </Link>
                  </TableCell> */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/adm/editais/editar/${e.id}`}>
                          <Pencil className="w-4 h-4 mr-1" /> Editar
                        </Link>
                      </Button>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="bg-red-500">
                          <Trash2 className="w-4 h-4 mr-1" /> Excluir
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[400px]">
                        <DialogHeader>
                          <DialogTitle>Deletar edital</DialogTitle>
                          <DialogDescription>
                            Tem certeza que deseja deletar este edital? Essa ação não pode ser desfeita.
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                          </DialogClose>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(e.id)}
                          >
                            Deletar
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {pageItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-gray-600">
                    Nenhum edital encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {pageItems.length} de {filtered.length} resultados
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </Dialog>

  )
}
