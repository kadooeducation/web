"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { HTTPError } from "ky";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { kyClient } from "@/infra/external/http/ky-client/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/presentation/external/components/ui/select";
import { Label } from "@/presentation/shared/components";

const schema = z.object({
  teamId: z.string(),
  edictId: z.string(),
});

type FormValues = z.infer<typeof schema>;

interface UsersEdictFormProps {
  teams: { id: number; name: string }[];
  edicts: {
    id: number;
    title: string;
  }[];
}

export function TeamsEdictForm({ teams, edicts }: UsersEdictFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    await kyClient
      .post("teams/add-to-edict", {
        teamId: data.teamId,
        edictId: data.edictId,
      })
      .then(() => {
        toast.success("Equipe atrelada ao edital com sucesso.");

        reset({
          edictId: "",
          teamId: "",
        });
      })
      .catch(async (err) => {
        if (err instanceof HTTPError) {
          const { message } = await err.response.json<{ message: string }>();

          toast.error(message);
        }

        reset({
          edictId: "",
          teamId: "",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 p-6">
      <div className="grid gap-2">
        <Label
          htmlFor="userId"
          className="text-sm font-medium text-neutral-800"
        >
          Equipes *
        </Label>
        <Controller
          name="teamId"
          control={control}
          render={({ field }) => (
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma equipe para participar do edital" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Equipes</SelectLabel>
                  {teams?.map((team) => (
                    <SelectItem value={team.id.toString()} key={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        {errors.teamId && (
          <p className="text-xs text-red-600">{errors.teamId.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label
          htmlFor="userId"
          className="text-sm font-medium text-neutral-800"
        >
          Editais *
        </Label>
        <Controller
          name="edictId"
          control={control}
          render={({ field }) => (
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um edital" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Editais</SelectLabel>
                  {edicts.map((edict) => (
                    <SelectItem value={edict.id.toString()} key={edict.id}>
                      {edict.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <Select {...register("edictId")}></Select>
        {errors.edictId && (
          <p className="text-xs text-red-600">{errors.edictId.message}</p>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <Link
          href="/adm/gerenciar-usuarios"
          className="rounded-md border px-4 py-2 text-sm hover:bg-neutral-50"
        >
          Voltar
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium disabled:opacity-70"
          style={{ backgroundColor: "#5127FF", color: "#fff" }}
        >
          {isSubmitting ? "Confirmando..." : "Confirmar"}
        </button>
      </div>
    </form>
  );
}
