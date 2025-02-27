import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  ramal: z.string(),
});

type formType = z.infer<typeof formSchema>;

export function FallForm() {
  const { register, handleSubmit } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  function handleSubmitFormTicket(data: formType) {
    console.log(data);
  }

  return (
    <>
      <title>N1track | Queda de ligação</title>

      <form
        onSubmit={handleSubmit(handleSubmitFormTicket)}
        className="dark:bg-accent border-accent-foreground/10 flex w-9/10 flex-col items-center justify-center gap-5 rounded-md border p-5 md:w-8/10 lg:w-7/10 xl:w-1/2"
      >
        <div className="flex w-full gap-3">
          <div className="flex w-full flex-col gap-3">
            <Label>Ramal da queda</Label>
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
    </>
  );
}
