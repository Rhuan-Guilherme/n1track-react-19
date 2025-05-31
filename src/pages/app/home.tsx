import { getTicketsByUser } from "@/api/get-tickets-by-user";
import { ButtonSelectForm } from "@/components/button-select-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { useErrorNetworkApi } from "@/hooks/error-network-api";
import CardsComponent from "@/pages/app/tickets/cards";
import { useQuery } from "@tanstack/react-query";
import {
  BellRing,
  BookOpenCheck,
  Check,
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

export function Home() {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isVip, setIsVip] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClose, setIsClose] = useState<boolean>(false);

  const params = new URLSearchParams();
  if (isDeleted) params.append("isDeleted", "true");
  if (isVip) params.append("vip", "true");
  if (isOpen) params.append("open", "true");
  if (isClose) params.append("close", "true");
  const queryString = `?${params.toString()}`;

  const {
    data: tickets,
    error,
    isError,
    failureCount,
    refetch,
  } = useQuery({
    queryKey: ["tickets", isDeleted, isVip, isOpen, isClose],
    queryFn: () => getTicketsByUser(queryString),
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
                onClick={() => {
                  setIsDeleted(false);
                  setIsVip(false);
                }}
                className="cursor-pointer"
              >
                <LayoutList className="h-5 w-5" />
                Listar todos
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
              >
                <BookOpenCheck className="h-5 w-5" />
                Listar abertos
                {isOpen && (
                  <DropdownMenuShortcut>
                    <Check className="h-4 w-4" />
                  </DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsClose(!isClose)}
                className="cursor-pointer"
              >
                <CopyX className="h-5 w-5" />
                Listar fechados
                {isClose && (
                  <DropdownMenuShortcut>
                    <Check className="h-4 w-4" />
                  </DropdownMenuShortcut>
                )}
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
              <DropdownMenuItem
                onClick={() => setIsVip(!isVip)}
                className="cursor-pointer"
              >
                <CrownIcon className="h-5 w-5" />
                Chamados VIPs
                {isVip && (
                  <DropdownMenuShortcut>
                    <Check className="h-4 w-4" />
                  </DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleted(!isDeleted)}
                className="cursor-pointer"
              >
                <Trash className="h-5 w-5" />
                Chamados excluidos
                {isDeleted && (
                  <DropdownMenuShortcut>
                    <Check className="h-4 w-4" />
                  </DropdownMenuShortcut>
                )}
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
