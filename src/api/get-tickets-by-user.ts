import { api } from "@/lib/axios";

interface GetUserResponse {
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
    type: "CHAMADO" | "REITERACAO" | "TRANSFERENCIA" | "QUEDA";
    vip: boolean;
    status: "ABERTO" | "FECHADO";
    userId: string;
    userName: string;
  }[];
}

export async function getTicketsByUser() {
  const response = await api.get("/tickets");

  return response.data as GetUserResponse;
}
