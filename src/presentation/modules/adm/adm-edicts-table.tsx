"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { format, parse } from "date-fns";
import { EllipsisIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/presentation/external/components/ui/button";
import { Checkbox } from "@/presentation/external/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/presentation/external/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/external/components/ui/table";

type Edict = {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  organizer: string;
  status: string; // "ABERTO" | "ENCERRADO" | "EM BREVE"
  categories: string[];
};

// --- Helper de data (date-fns puro, sem T00 e sem toLocale) ---
const fmtBR = (d: string) =>
  format(parse(d, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");

// --- Filtro multi-coluna igual ao da Tabela 1 ---
const multiColumnFilterFn: FilterFn<Edict> = (row, _columnId, filterValue) => {
  const e = row.original;
  const searchable = [
    e.title,
    e.organizer,
    e.status,
    e.categories?.join(" "),
    fmtBR(e.startDate.toString()),
    fmtBR(e.endDate.toString()),
  ]
    .join(" ")
    .toLowerCase();

  const query = String(filterValue ?? "").toLowerCase();
  return searchable.includes(query);
};

// --- Colunas seguindo o layout da Tabela 1 ---
const columns: ColumnDef<Edict>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Selecionar linha"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Título",
    accessorKey: "title",
    cell: ({ row }) => (
      <div className="font-medium truncate">
        {row.getValue("title") as string}
      </div>
    ),
    size: 320,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
    enableSorting: false,
  },
  {
    header: "Organizador",
    accessorKey: "organizer",
    cell: ({ row }) => (
      <div className="text-muted-foreground truncate">
        {row.getValue("organizer") as string}
      </div>
    ),
    size: 240,
    filterFn: multiColumnFilterFn,
    enableSorting: false,
  },
  {
    id: "period",
    header: "Período",
    accessorFn: (e) => `${e.startDate}|${e.endDate}`,
    cell: ({ row }) => {
      const e = row.original;
      return (
        <div className="tabular-nums">
          {fmtBR(e.startDate.toString())}{" "}
          <span className="mx-1 text-gray-400">até</span>{" "}
          {fmtBR(e.endDate.toString())}
        </div>
      );
    },
    size: 220,
    enableSorting: false,
  },
  {
    id: "status",
    header: "Status",
    accessorFn: (e) => e.status,
    cell: ({ row }) => {
      const status = String(row.getValue("status") ?? "").toUpperCase();
      const color =
        status === "ABERTO"
          ? "bg-green-100 text-green-700"
          : status === "ENCERRADO"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700";
      const label = status.charAt(0) + status.slice(1).toLowerCase();
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}
        >
          {label}
        </span>
      );
    },
    size: 140,
    enableSorting: false,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Ações</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
    enableSorting: false,
  },
];

export function KadooEdictsTable({ edicts }: { edicts: Edict[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<Edict[]>([]);

  useEffect(() => {
    setData(edicts);
  }, [edicts]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, pagination, columnFilters, columnVisibility },
  });

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border bg-background">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent">
                {hg.headers.map((h) => (
                  <TableHead
                    key={h.id}
                    style={{ width: `${h.getSize()}px` }}
                    className="h-11 select-none"
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:py-0">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function RowActions({ row }: { row: Row<Edict> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Ações"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Editar</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Duplicar</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <span>Excluir</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
