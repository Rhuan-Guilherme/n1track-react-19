import { api } from "@/lib/axios";

export async function restoreTicket(id: string) {
  const response = await api.patch(`/ticket/restore/${id}`);

  return response.data;
}
