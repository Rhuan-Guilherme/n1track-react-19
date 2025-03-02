import { getTicketsByUser } from "@/api/get-tickets-by-user";
import { ButtonSelectForm } from "@/components/button-select-form";
import CardsComponent from "@/pages/app/tickets/cards";
import { useQuery } from "@tanstack/react-query";
import { BellRing, PhoneForwarded, PhoneOff, ScrollText } from "lucide-react";
import { Outlet } from "react-router-dom";

export function Home() {
  const { data: tickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTicketsByUser,
  });

  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <ButtonSelectForm to="/">
          <ScrollText className="h-5 w-5" />
          <span className="hidden md:inline">Chamado</span>
        </ButtonSelectForm>
        <ButtonSelectForm to="/reiteracao">
          <BellRing className="h-5 w-5" />
          <span className="hidden md:inline">Reiteração</span>
        </ButtonSelectForm>
        <ButtonSelectForm to="/transferencia">
          <PhoneForwarded className="h-5 w-5" />
          <span className="hidden md:inline">Transferência</span>
        </ButtonSelectForm>
        <ButtonSelectForm to="/queda">
          <PhoneOff className="h-5 w-5" />
          <span className="hidden md:inline">Queda</span>
        </ButtonSelectForm>
      </div>
      <section className="mt-10 flex justify-center">
        <Outlet />
      </section>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
        {tickets &&
          tickets.tickets.map((ticket) => (
            <CardsComponent key={ticket.id} ticket={ticket} />
          ))}
      </div>
    </>
  );
}
