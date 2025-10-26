"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/presentation/external/components/ui/dialog"
import { Button } from "@/presentation/external/components/ui/button"

interface ConfirmDialogProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  onConfirm: () => void
}

export function ConfirmDialog({ trigger, title, description, onConfirm }: ConfirmDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? "Confirmar inscrição?"}</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">{description ?? "Você deseja se inscrever neste edital?"}</p>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogTrigger>
          <Button onClick={onConfirm} className="bg-[#5127FF] text-white hover:bg-[#5127FF]/90">
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
