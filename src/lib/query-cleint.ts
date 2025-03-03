import { GetTicketsResponse } from "@/api/get-tickets-by-user";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export function updateStatus(
  queryItemId: string,
  status: "ABERTO" | "FECHADO",
) {
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
        if (ticket.id === queryItemId) {
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

export function deleteItem(id: string) {
  const ticketsListCached = queryClient.getQueriesData<GetTicketsResponse>({
    queryKey: ["tickets"],
  });

  ticketsListCached.forEach(([cachedKey, cachedData]) => {
    if (!cachedData) {
      return;
    }

    queryClient.setQueryData<GetTicketsResponse>(cachedKey, {
      tickets: cachedData.tickets.filter((ticket) => ticket.id !== id),
    });
  });
}
