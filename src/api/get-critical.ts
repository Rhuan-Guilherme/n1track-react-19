import { api } from "@/lib/axios";

interface GetCriticalResponse {
  id: string;
  title: string;
  description: string;
  link: string;
}

export async function getCriticalApi() {
  const response = await api.get("/critical");

  return response.data as GetCriticalResponse;
}
