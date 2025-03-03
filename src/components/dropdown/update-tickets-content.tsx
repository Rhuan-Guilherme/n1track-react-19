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

const visibleFildsByType: Record<GetTicketResponse["type"], string[]> = {
  CHAMADO: ["name", "login", "ramal", "patrimono", "informacao", "local"],
  REITERACAO: ["name", "login", "ramal", "chamado"],
  TRANSFERENCIA: ["name", "ramal", "destinatario"],
  QUEDA: ["ramal"],
};

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
      patrimono: ticket.patrimono,
      informacao: ticket.informacao,
      local: ticket.local,
      chamado: ticket.chamado,
      destinatario: ticket.destinatario,
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

  const visibleFilds = visibleFildsByType[ticket.type];

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edição - {ticket.type}</DialogTitle>
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-2">
            {visibleFilds.includes("name") && (
              <div className="w-full">
                <Label htmlFor="name">Nome</Label>
                <Input type="text" id="name" {...register("name")} />
              </div>
            )}

            {visibleFilds.includes("login") && (
              <div className="w-full">
                <Label htmlFor="login">Login</Label>
                <Input type="text" id="login" {...register("login")} />
              </div>
            )}

            {visibleFilds.includes("destinatario") && (
              <div className="w-full">
                <Label htmlFor="destinatario">Destinatário</Label>
                <Input
                  type="text"
                  id="destinatario"
                  {...register("destinatario")}
                />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {visibleFilds.includes("ramal") && (
              <div className="w-full">
                <Label htmlFor="ramal">Ramal</Label>
                <Input type="text" id="ramal" {...register("ramal")} />
              </div>
            )}
            {visibleFilds.includes("patrimono") && (
              <div className="w-full">
                <Label htmlFor="patrimonio">Patrimônio</Label>
                <Input type="text" id="patrimonio" {...register("patrimono")} />
              </div>
            )}
            {visibleFilds.includes("chamado") && (
              <div className="w-full">
                <Label htmlFor="chamado">Chamado</Label>
                <Input type="text" id="chamado" {...register("chamado")} />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {visibleFilds.includes("informacao") && (
              <div className="w-full">
                <Label htmlFor="informacao">Informação</Label>
                <Input
                  type="text"
                  id="informacao"
                  {...register("informacao")}
                />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {visibleFilds.includes("local") && (
              <div className="w-full">
                <Label htmlFor="local">Local</Label>
                <Input type="text" id="local" {...register("local")} />
              </div>
            )}
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </DialogHeader>
    </DialogContent>
  );
}
