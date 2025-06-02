import { createTransferApi } from "@/api/create-trasnfer-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePersistedForm } from "@/hooks/set-value-form-local-storage";
import { queryClient } from "@/lib/query-cleint";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  ramal: z.string(),
  destinatario: z.string(),
});

type formType = z.infer<typeof formSchema>;

export function TransferForm() {
  const { clearFormStorage, handleChange } = usePersistedForm("n1track");

  const { register, handleSubmit, reset } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ramal: localStorage.getItem("@n1track-form-ramal") || undefined,
      destinatario:
        localStorage.getItem("@n1track-form-destinatario") || undefined,
      name: localStorage.getItem("@n1track-form-name") || undefined,
    },
  });

  const { mutateAsync: createTransferApiFn, isPending } = useMutation({
    mutationFn: createTransferApi,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  async function handleSubmitFormTicket(data: formType) {
    try {
      await createTransferApiFn(data);
      clearFormStorage();
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <title>N1track | Tranferência</title>

      <form
        onSubmit={handleSubmit(handleSubmitFormTicket)}
        className="dark:bg-accent border-accent-foreground/10 flex flex-col items-center justify-center gap-5 rounded-md border p-5 md:w-8/10 lg:w-7/10 xl:w-1/2"
      >
        <div className="flex w-full gap-3">
          <div className="flex w-full flex-col gap-3">
            <Label>Nome</Label>
            <Input
              {...register("name")}
              type="text"
              onChange={handleChange}
              className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
            />
          </div>
          <div className="relative flex w-full flex-col gap-3">
            <Label>Destinatário</Label>

            <Input
              {...register("destinatario")}
              type="text"
              onChange={handleChange}
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
              onChange={handleChange}
              className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
            />
          </div>
        </div>

        <div className="flex w-full justify-start">
          <Button disabled={isPending} className="cursor-pointer" type="submit">
            {isPending ? "Aguarde..." : "Registrar"}
          </Button>
        </div>
      </form>
    </>
  );
}
