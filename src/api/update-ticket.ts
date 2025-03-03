import { api } from "@/lib/axios";

interface UpdateTicketRequest {
  id: string;
  name?: string;
  login?: string;
  ramal?: string;
  local?: string;
  patrimono?: string;
  chamado?: string;
  informacao?: string;
  destinatario?: string;
  area?: string;
  type?: "CHAMADO" | "REITERACAO" | "TRANSFERENCIA" | "QUEDA";
  vip?: boolean;
}

export async function updateTicket(id: string, data: UpdateTicketRequest) {
  const response = await api.put(`/ticket/update/${id}`, { ...data });

  return response.data;
}
