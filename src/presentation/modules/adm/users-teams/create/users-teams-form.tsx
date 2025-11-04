"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { HTTPError } from "ky";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import type { User } from "@/business/domain/user";
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
  userId: z.string(),
  teamId: z.string(),
});

type FormValues = z.infer<typeof schema>;

interface UsersEdictFormProps {
  users: User[];
  teams: {
    id: number;
    name: string;
  }[];
}

export function UsersTeamsForm({ users, teams }: UsersEdictFormProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    await kyClient
      .post<{ teamId: string; userId: string }>("teams/add-user", {
        teamId: data.teamId,
        userId: data.userId,
      })
      .then(() => {
        toast.success("Usuário atrelado a equipe com sucesso.");

        reset();
      })
      .catch(async (err) => {
        if (err instanceof HTTPError) {
          const { message } = await err.response.json<{ message: string }>();

          toast.error(message);
        }
      });
    // await userEdictGatewayHttp
    //   .create({
    //     userId: data.userId,
    //     edictId: data.edictId,
    //   })
    //   .then(() => {
    //     toast.success("Usuário atrelado com sucesso");
    //   })
    //   .catch(() => {
    //     toast.error("Usuário já está cadastrado nesse edital");
    //   });
    // reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 p-6">
      <div className="grid gap-2">
        <Label
          htmlFor="userId"
          className="text-sm font-medium text-neutral-800"
        >
          Usuários *
        </Label>
        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um usuário" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Equipes</SelectLabel>
                  {users.map((user) => (
                    <SelectItem value={user.id.toString()} key={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        {errors.userId && (
          <p className="text-xs text-red-600">{errors.userId.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label
          htmlFor="userId"
          className="text-sm font-medium text-neutral-800"
        >
          Equipe *
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
                <SelectValue placeholder="Selecione uma equipe para o usuário participar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Equipes</SelectLabel>
                  {teams?.map((edict) => (
                    <SelectItem value={edict.id.toString()} key={edict.id}>
                      {edict.name}
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
