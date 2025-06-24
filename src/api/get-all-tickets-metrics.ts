import { api } from "@/lib/axios";

export async function getAllTicketMetrics() {
  const response = await api.get("/ticket/metrics");

  return response.data;
}
