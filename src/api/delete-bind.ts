import { api } from "@/lib/axios";

export async function deleteBindApi(id: string) {
  const response = await api.delete("/binds/delete/" + id);

  return response.data;
}
