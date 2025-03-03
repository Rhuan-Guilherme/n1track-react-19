import { api } from "@/lib/axios";

export async function statusTicketClose(id: string) {
  const response = await api.patch(`/ticket/close/${id}`);

  return response.data;
}
