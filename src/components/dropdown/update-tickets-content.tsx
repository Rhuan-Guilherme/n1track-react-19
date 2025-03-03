import { useForm } from "react-hook-form";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { updateTicket } from "@/api/update-ticket";
import { queryClient } from "@/lib/query-cleint";

interface GetTicketResponse {
  name: string;
  id: string;
  login: string;
  ramal: string;
  local: string;
  informacao: string;
  patrimono: string;
  chamado: string;
  destinatario: string;
  area: string;
  created_at: string;
  type: "CHAMADO" | "REITERACAO" | "TRANSFERENCIA" | "QUEDA";
  vip: boolean;
  userId: string;
  userName: string;
}

export function UpdateTicketContent({
  ticket,
  onClose,
}: {
  ticket: GetTicketResponse;
  onClose: () => void;
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: ticket.name,
      login: ticket.login,
      ramal: ticket.ramal,
      patrimonio: ticket.patrimono,
      informacao: ticket.informacao,
      local: ticket.local,
    },
  });

  const { mutateAsync: updateTicketFn } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateTicket(id, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleUpdate(data: any) {
    await updateTicketFn({ id: ticket.id, data });
    onClose();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edição - {ticket.type}</DialogTitle>
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-2">
            <div className="w-full">
              <Label htmlFor="name">Nome</Label>
              <Input type="text" id="name" {...register("name")} />
            </div>
            <div className="w-full">
              <Label htmlFor="login">Login</Label>
              <Input type="text" id="login" {...register("login")} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Label htmlFor="ramal">Ramal</Label>
              <Input type="text" id="ramal" {...register("ramal")} />
            </div>
            <div className="w-full">
              <Label htmlFor="patrimonio">Patrimônio</Label>
              <Input type="text" id="patrimonio" {...register("patrimonio")} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Label htmlFor="informacao">Informação</Label>
              <Input type="text" id="informacao" {...register("informacao")} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Label htmlFor="local">Local</Label>
              <Input type="text" id="local" {...register("local")} />
            </div>
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </DialogHeader>
    </DialogContent>
  );
}
