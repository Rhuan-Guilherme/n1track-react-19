import { api } from "@/lib/axios";

export async function deleteTicket(id: string) {
  const response = await api.delete(`/ticket/delete/${id}`);

  return response.data;
}
