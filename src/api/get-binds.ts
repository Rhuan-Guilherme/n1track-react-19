import { api } from "@/lib/axios";

interface GetCriticalResponse {
  binds: {
    id: string;
    title: string;
    description: string;
  }[];
}

export async function getBindsApi(query?: string) {
  const response = await api.get(`/binds${query ? `?query=${query}` : ""}`);

  return response.data as GetCriticalResponse;
}
