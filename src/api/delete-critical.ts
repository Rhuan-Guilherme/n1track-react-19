import { api } from "@/lib/axios";

export async function deleteCriticalApi(id: string) {
  const response = await api.delete("/critical/delete/" + id);

  return response.data;
}
