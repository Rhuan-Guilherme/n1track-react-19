import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  nome: z.string(),
  ramal: z.string(),
  destinatario: z.string(),
});

type formType = z.infer<typeof formSchema>;

export function TransferForm() {
  const { register, handleSubmit } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

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
        <div className="relative flex w-full flex-col gap-3">
          <Label>Login</Label>

          <Input
            {...register("destinatario")}
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
      </div>

      <div className="flex w-full justify-start">
        <Button type="submit">Registrar</Button>
      </div>
    </form>
  );
}
