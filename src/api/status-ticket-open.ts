import { api } from "@/lib/axios";

export async function statusTicketOpen(id: string) {
  const response = await api.patch(`/ticket/open/${id}`);

  return response.data;
}
