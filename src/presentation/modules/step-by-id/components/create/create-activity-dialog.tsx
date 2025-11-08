"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ptBR } from "date-fns/locale";
import { Calendar as CalIcon, Clock, Clock3 } from "lucide-react";
import { type PropsWithChildren, startTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createActivityStepAction } from "@/app/adm/editais/[id]/(actions)/create-activity-step-action";
import { Button } from "@/presentation/external/components/ui/button";
import { Calendar as CalendarShad } from "@/presentation/external/components/ui/calendar";
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
import {
  Input,
  Input as ShadInput,
} from "@/presentation/external/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/presentation/external/components/ui/popover";
import { Textarea } from "@/presentation/external/components/ui/textarea";
import { cn } from "@/presentation/external/lib/utils";
import { uploadFile } from "@/presentation/modules/edict/create/components/form/form";
import { Label } from "@/presentation/shared/components";

const MAX_PDF_BYTES = 5 * 1024 * 1024;

const schema = z.object({
  title: z.string().min(1, "Informe o título."),
  date: z.date(),
  deliveryTime: z.string(),
  dueDate: z.date(),
  time: z.string(),
  file: z
    .custom<File>()
    .nullable()
    .refine((f) => !f || f.type === "application/pdf", "Envie um PDF.")
    .refine(
      (f) => !f || f.size <= MAX_PDF_BYTES,
      "PDF deve ter no máximo 5MB."
    ),
  description: z.string().min(1, "Descreva a atividade."),
});

type FormData = z.infer<typeof schema>;

interface CreateActivityDialogProps extends PropsWithChildren {
  edictId: number;
}

export function CreateActivityDialog({
  edictId,
  children,
}: CreateActivityDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      date: undefined,
      dueDate: undefined,
      file: null,
      description: "",
      deliveryTime: "",
    },
  });

  async function onSubmit(data: FormData) {
    if (!data.file) return;

    const { url: edictUrl } = await uploadFile<{ url: string; error: boolean }>(
      data.file
    );

    startTransition(async () => {
      await createActivityStepAction(edictId, {
        ...data,
        file: edictUrl,
        date: new Date(data.date),
      }).then(() => {
        toast.success(`Etapa ${data.title} criada com sucesso!`);
        reset();
      });
    });
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) reset();
      }}
    >
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Nova Atividade</DialogTitle>
          <DialogDescription>
            Preencha os campos para adicionar uma atividade.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-2" onSubmit={handleSubmit(onSubmit)}>
          <label className="grid gap-1" htmlFor="title">
            <span className="text-sm font-medium">Título *</span>
            <ShadInput
              placeholder="Ex: Entrega do Canvas"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-xs text-red-500">
                {errors.title.message}
              </span>
            )}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="grid gap-1" htmlFor="date">
              <span className="text-sm font-medium">Data *</span>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? field.value.toLocaleDateString("pt-BR")
                          : "Selecionar"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <CalendarShad
                        mode="single"
                        captionLayout="dropdown"
                        locale={ptBR}
                        selected={field.value}
                        onSelect={(d) => field.onChange(d ?? undefined)}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.date && (
                <span className="text-xs text-red-500">
                  {errors.date.message}
                </span>
              )}
            </label>

            <label className="grid gap-1" htmlFor="dueDate">
              <span className="text-sm font-medium">Entrega *</span>
              <Controller
                control={control}
                name="dueDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <Clock3 className="mr-2 h-4 w-4" />
                        {field.value
                          ? field.value.toLocaleDateString("pt-BR")
                          : "Selecionar"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <CalendarShad
                        mode="single"
                        captionLayout="dropdown"
                        locale={ptBR}
                        selected={field.value}
                        onSelect={(d) => field.onChange(d ?? undefined)}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.dueDate && (
                <span className="text-xs text-red-500">
                  {errors.dueDate.message}
                </span>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="time-picker">Horário do Evento *</Label>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <Input
                type="time"
                id="time-picker"
                defaultValue="10:30"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
            {errors.deliveryTime && (
              <span className="text-xs text-red-500">
                {errors.deliveryTime.message}
              </span>
            )}
          </div>

          <label className="grid gap-1" htmlFor="file">
            <span className="text-sm font-medium">Anexo (PDF)</span>
            <ShadInput
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setValue("file", e.target.files?.[0] ?? null, {
                  shouldValidate: true,
                })
              }
            />
            {errors.file && (
              <span className="text-xs text-red-500">
                {errors.file.message as string}
              </span>
            )}
          </label>

          <label className="grid gap-1" htmlFor="description">
            <span className="text-sm font-medium">Descrição *</span>
            <Textarea
              rows={4}
              placeholder="Detalhes da atividade"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}
          </label>

          <DialogFooter className="mt-1">
            <Button
              className="bg-[#5127FF] hover:bg-[#5127FF]/90"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adicionando..." : "Adicionar Atividade"}
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>

      <DialogTrigger asChild>{children}</DialogTrigger>
    </Dialog>
  );
}
