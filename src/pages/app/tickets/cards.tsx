import Bedge from "@/components/ui/bedge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import DescriptionCard from "./description-card";
import { Check, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { statusTicketClose } from "@/api/status-ticket-close";
import { deleteItem, updateStatus } from "@/lib/query-cleint";
import { statusTicketOpen } from "@/api/status-ticket-open";
import clipboardCopy from "clipboard-copy";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";
import { deleteTicket } from "@/api/delete-ticket";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UpdateTicketContent } from "@/components/dropdown/update-tickets-content";
import { useState } from "react";
import { restoreTicket } from "@/api/restore-ticket";

interface GetTicketResponse {
  ticket: {
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
    isDeleted: boolean;
    type: "CHAMADO" | "REITERACAO" | "TRANSFERENCIA" | "QUEDA";
    vip: boolean;
    status: "ABERTO" | "FECHADO";
    userId: string;
    userName: string;
  };
}

export default function CardsComponent({ ticket }: GetTicketResponse) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const isoDate = ticket.created_at;
  const timeZone = "America/sao_Paulo";

  const zonedDate = toZonedTime(parseISO(isoDate), timeZone);
  const formattedDate = format(zonedDate, "d/M/yyyy 'às' HH:mm", {
    locale: ptBR,
  });

  const { mutateAsync: statusTicketCloseFn } = useMutation({
    mutationFn: statusTicketClose,
    async onSuccess(_, id) {
      updateStatus(id, "FECHADO");
    },
  });

  const { mutateAsync: statusTicketOpenFn } = useMutation({
    mutationFn: statusTicketOpen,
    async onSuccess(_, id) {
      updateStatus(id, "ABERTO");
    },
  });

  const { mutateAsync: deleteTicketFn } = useMutation({
    mutationFn: deleteTicket,
    async onSuccess(_, id) {
      deleteItem(id);
    },
  });

  const { mutateAsync: restoreTicketFn } = useMutation({
    mutationFn: restoreTicket,
    async onSuccess(_, id) {
      deleteItem(id);
    },
  });

  function handleCopy() {
    const description = document.getElementById(`desc-${ticket.id}`)?.innerText;
    if (description) {
      clipboardCopy(description);
      toast.success("Texto copiado para a área de transferência!");
    } else {
      toast.error("Erro ao copiar texto.");
    }
  }

  return (
    <Card
      className={`relative max-w-72 min-w-72 ${ticket.status === "FECHADO" && "border-2 border-emerald-700 opacity-40 dark:border-emerald-500"} ${ticket.vip === true && "border-2 border-amber-300"} ${ticket.isDeleted === true && "border-2 border-rose-500"}`}
    >
      <CardHeader>
        {ticket.status === "FECHADO" && (
          <button
            onClick={() => statusTicketOpenFn(ticket.id)}
            className="absolute -top-2.5 -right-2.5 cursor-pointer rounded-sm bg-emerald-700 p-0.5 transition-all hover:bg-rose-500"
          >
            <Check className="h-5 w-5" />
          </button>
        )}

        {ticket.status === "ABERTO" && ticket.isDeleted === false && (
          <button
            onClick={() => deleteTicketFn(ticket.id)}
            className="border-border bg-accent-foreground/10 top- absolute right-1.5 cursor-pointer rounded-sm border p-0.5 transition-all hover:bg-rose-500"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <CardDescription>{formattedDate}</CardDescription>
        <CardTitle className="mt-1 flex gap-2 text-base leading-5">
          {ticket.name.split(" ")[0] + " - "} {ticket.ramal}
          <Bedge vip={ticket.vip} status={ticket.status} type={ticket.type} />
        </CardTitle>
        <CardDescription>{ticket.area}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-border mb-3 h-0.5 w-full"></div>
        <DescriptionCard id={`desc-${ticket.id}`} ticket={ticket} />
        <div className="bg-border mt-3 h-0.5 w-full"></div>
      </CardContent>
      {ticket.status === "ABERTO" && ticket.isDeleted === false && (
        <CardFooter className="flex items-center justify-center gap-2">
          <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
            <DialogTrigger asChild>
              <Button className="flex-1 cursor-pointer" variant="secondary">
                editar
              </Button>
            </DialogTrigger>
            <UpdateTicketContent
              ticket={ticket}
              onClose={() => setIsOpenModal(false)}
            />
          </Dialog>

          <Button
            onClick={handleCopy}
            className="flex-1 cursor-pointer"
            variant="secondary"
          >
            copiar
          </Button>
          <Button
            onClick={() => statusTicketCloseFn(ticket.id)}
            className="flex-1 cursor-pointer"
            variant="secondary"
          >
            concluir
          </Button>
        </CardFooter>
      )}
      {ticket.isDeleted === true && (
        <CardFooter className="flex items-center justify-center gap-2">
          <Button
            onClick={() => {
              restoreTicketFn(ticket.id);
              toast(
                "Chamado restaurado. Volte para a listagem para revisá-lo.",
              );
            }}
            className="flex-1 cursor-pointer"
            variant="secondary"
          >
            Restaurar chamado
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
