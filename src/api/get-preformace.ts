import { api } from "@/lib/axios";

export interface GetTicketsResponse {
  total: string;
  chamado: string;
  reiteracao: string;
  transferencia: string;
  queda: string;
}

export async function getPerformaceByUser() {
  const response = await api.get(`/performace`);

  return response.data as GetTicketsResponse;
}
