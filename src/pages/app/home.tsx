import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const formSchema = z.object({
  nome: z.string(),
  login: z.string(),
  ramal: z.string(),
  patrimonio: z.string(),
  informacao: z.string(),
  local: z.string(),
});

type formType = z.infer<typeof formSchema>;

export function Home() {
  const { register, handleSubmit, control, watch } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const localWaatched = watch("local");

  function handleSubmitFormTicket(data: formType) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitFormTicket)}
      className="dark:bg-accent border-accent-foreground/10 flex w-1/2 flex-col items-center justify-center gap-5 rounded-md border p-5"
    >
      <div className="flex w-full gap-3">
        <div className="flex w-full flex-col gap-3">
          <Label>Nome</Label>
          <Input
            {...register("nome")}
            type="text"
            className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <Label>Login</Label>

          <Input
            {...register("login")}
            type="text"
            className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
          />
        </div>
      </div>
      <div className="flex w-full gap-3">
        <div className="flex w-full flex-col gap-3">
          <Label>Ramal</Label>
          <Input
            {...register("ramal")}
            type="text"
            className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <Label>Patrimônio</Label>
          <Input
            {...register("patrimonio")}
            type="text"
            className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
          />
        </div>
      </div>

      <div className="w-full">
        <Label>Informação</Label>
        <Input
          {...register("informacao")}
          type="text"
          className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
        />
      </div>

      <div className="flex w-full gap-3">
        <div className="flex w-full flex-col gap-3">
          <Label>Local</Label>
          <Input
            {...register("local")}
            value={localWaatched}
            type="text"
            className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <Label>Gabinetes</Label>

          <Controller
            control={control}
            name="local"
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Select
                  defaultValue=" "
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                >
                  <SelectTrigger className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=" "></SelectItem>
                    <SelectItem value="Local 1">Local 1</SelectItem>
                    <SelectItem value="Local 2">Local 2</SelectItem>
                    <SelectItem value="Local 3">Local 3</SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          ></Controller>
        </div>
      </div>
      <div className="flex w-full justify-start">
        <Button type="submit">Registrar</Button>
      </div>
    </form>
  );
}
