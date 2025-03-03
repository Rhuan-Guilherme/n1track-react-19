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
import { Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { statusTicketClose } from "@/api/status-ticket-close";
import { queryClient } from "@/lib/query-cleint";
import { GetTicketsResponse } from "@/api/get-tickets-by-user";
import { statusTicketOpen } from "@/api/status-ticket-open";

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
    type: "CHAMADO" | "REITERACAO" | "TRANSFERENCIA" | "QUEDA";
    vip: boolean;
    status: "ABERTO" | "FECHADO";
    userId: string;
    userName: string;
  };
}

export default function CardsComponent({ ticket }: GetTicketResponse) {
  function updateStatusTicket(id: string, status: "ABERTO" | "FECHADO") {
    const ticketsListCached = queryClient.getQueriesData<GetTicketsResponse>({
      queryKey: ["tickets"],
    });

    ticketsListCached.forEach(([cachedKey, cachedData]) => {
      if (!cachedData) {
        return;
      }

      queryClient.setQueryData<GetTicketsResponse>(cachedKey, {
        ...cachedData,
        tickets: cachedData.tickets.map((ticket) => {
          if (ticket.id === id) {
            return {
              ...ticket,
              status,
            };
          }
          return ticket;
        }),
      });
    });
  }

  const { mutateAsync: statusTicketCloseFn } = useMutation({
    mutationFn: statusTicketClose,
    async onSuccess(_, id) {
      updateStatusTicket(id, "FECHADO");
    },
  });

  const { mutateAsync: statusTicketOpenFn } = useMutation({
    mutationFn: statusTicketOpen,
    async onSuccess(_, id) {
      updateStatusTicket(id, "ABERTO");
    },
  });

  return (
    <Card
      className={`relative max-w-72 min-w-72 ${ticket.status === "FECHADO" && "border-2 border-emerald-700 opacity-40 dark:border-emerald-500"}`}
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

        <CardDescription>{ticket.created_at}</CardDescription>
        <CardTitle className="flex gap-2">
          {ticket.name} - {ticket.ramal}
          <Bedge status={ticket.status} type={ticket.type} />
        </CardTitle>
        <CardDescription>{ticket.area}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-border mb-3 h-0.5 w-full"></div>
        <DescriptionCard ticket={ticket} />
        <div className="bg-border mt-3 h-0.5 w-full"></div>
      </CardContent>
      {ticket.status === "ABERTO" && (
        <CardFooter className="flex items-center justify-center gap-2">
          <Button className="flex-1 cursor-pointer" variant="secondary">
            editar
          </Button>
          <Button className="flex-1 cursor-pointer" variant="secondary">
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
    </Card>
  );
}
