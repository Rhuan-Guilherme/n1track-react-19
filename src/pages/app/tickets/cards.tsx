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
    userId: string;
    userName: string;
  };
}

export default function CardsComponent({ ticket }: GetTicketResponse) {
  return (
    <Card className="max-w-72 min-w-72">
      <CardHeader>
        <CardDescription>{ticket.created_at}</CardDescription>
        <CardTitle>
          {(ticket.name, "-")} {ticket.ramal}
        </CardTitle>
        <CardDescription>{ticket.area}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-border mb-3 h-0.5 w-full"></div>
        <DescriptionCard ticket={ticket} />
        <div className="bg-border mt-3 h-0.5 w-full"></div>
      </CardContent>
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
    </Card>
  );
}
