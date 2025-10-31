"use client";

import { Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { kyClient } from "@/infra/external/http/ky-client/api";
import { Button } from "@/presentation/external/components/ui/button";
import { Card } from "@/presentation/external/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/external/components/ui/dialog";
import { Input } from "@/presentation/external/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/external/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/external/components/ui/table";

export const statusColorMap: Record<string, string> = {
  Aberto: "bg-green-100 text-green-700",
  Encerrado: "bg-red-100 text-red-700",
  "Em breve": "bg-yellow-100 text-yellow-700",
};

interface AdmEdictsTableProps {
  edicts: {
    id: number;
    status: string;
    categories: string[];
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }[];
}

export function AdmEdictsTable({ edicts }: AdmEdictsTableProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete(id: number) {
    setIsLoading(true);

    await kyClient
      .delete(`edict/${id}`)
      .then(() => {
        toast.success("Edital deletado com sucesso.");
      })
      .catch(() => {
        toast.error("Erro ao deletar o edital.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Dialog>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gerenciamento de Editais</h1>
            <p className="text-gray-600">
              Busque, filtre e gerencie os editais
            </p>
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
                />
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Select>
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
                    <span className="text-sm text-gray-700">
                      {new Date(e.startDate).toLocaleDateString()}
                    </span>
                    <span className="mx-1 text-gray-400">até</span>
                    <span className="text-sm text-gray-700">
                      {new Date(e.endDate).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusColorMap[e.status]
                      }`}
                    >
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
                        <Button
                          variant="destructive"
                          size="sm"
                          className="bg-red-500"
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Excluir
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[400px]">
                        <DialogHeader>
                          <DialogTitle>Deletar edital</DialogTitle>
                          <DialogDescription>
                            Tem certeza que deseja deletar este edital? Essa
                            ação não pode ser desfeita.
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
                            {isLoading ? "Deletando" : "Deletar"}
                            {isLoading && <Loader2 />}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {/* {pageItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-gray-600">
                    Nenhum edital encontrado.
                  </TableCell>
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </Card>

        {/* <div className="flex items-center justify-between">
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
        </div> */}
      </div>
    </Dialog>
  );
}
