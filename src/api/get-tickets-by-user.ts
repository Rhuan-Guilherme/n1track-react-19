import { api } from "@/lib/axios";

export interface GetTicketsResponse {
  tickets: {
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
  }[];
}

export async function getTicketsByUser(query: string) {
  const response = await api.get(`/tickets${query}`);

  return response.data as GetTicketsResponse;
}
