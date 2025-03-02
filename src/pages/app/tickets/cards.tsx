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
  return (
    <Card
      className={`relative max-w-72 min-w-72 ${ticket.status === "FECHADO" && "border-emerald-500 opacity-40"}`}
    >
      <CardHeader>
        {ticket.status === "FECHADO" && (
          <button className="absolute -top-2.5 -right-2.5 cursor-pointer rounded-sm bg-emerald-700 p-0.5 transition-all hover:bg-rose-500">
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
          <Button className="flex-1 cursor-pointer" variant="secondary">
            concluir
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
