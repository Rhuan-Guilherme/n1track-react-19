import { getTicketsByUser } from "@/api/get-tickets-by-user";
import { ButtonSelectForm } from "@/components/button-select-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { useErrorNetworkApi } from "@/hooks/error-network-api";
import CardsComponent from "@/pages/app/tickets/cards";
import { useQuery } from "@tanstack/react-query";
import {
  BellRing,
  BookOpenCheck,
  CopyX,
  CrownIcon,
  LayoutList,
  PhoneForwarded,
  PhoneOff,
  ScrollText,
  Search,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (isDeleted) params.set("isDeleted", "true");

    navigate("?" + params.toString());
  }, [isDeleted, navigate]);

  const {
    data: tickets,
    error,
    isError,
    failureCount,
    refetch,
  } = useQuery({
    queryKey: ["tickets", isDeleted],
    queryFn: () => getTicketsByUser(isDeleted),
  });

  useEffect(() => {
    refetch();
  }, [isDeleted, refetch]);

  useErrorNetworkApi({ error, failureCount, isError });

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-accent hover:bg-border flex cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm transition-all">
              <Search className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Filtre seus chamados:</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setIsDeleted(false)}
                className="cursor-pointer"
              >
                <LayoutList className="h-5 w-5" />
                Listar todos
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="cursor-pointer">
                <BookOpenCheck className="h-5 w-5" />
                Listar abertos
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <CopyX className="h-5 w-5" />
                Listar fechados
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="cursor-pointer">
                <ScrollText className="h-5 w-5" />
                Listar chamados
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <BellRing className="h-5 w-5" />
                Listar reiterações
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <PhoneForwarded className="h-5 w-5" />
                Listar transaferências
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <PhoneOff className="h-5 w-5" />
                Listar quedas
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="cursor-pointer">
                <CrownIcon className="h-5 w-5" />
                Chamados VIPs
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleted(true)}
                className="cursor-pointer"
              >
                <Trash className="h-5 w-5" />
                Chamados excluidos
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
