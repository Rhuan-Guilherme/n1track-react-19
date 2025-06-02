import { api } from "@/lib/axios";

interface GetCriticalResponse {
  binds: {
    id: string;
    title: string;
    description: string;
  }[];
}

export async function getBindsApi() {
  const response = await api.get("/binds");

  return response.data as GetCriticalResponse;
}
