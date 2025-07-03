import { api } from "@/lib/axios";

export async function deleteUser(userId: string) {
  const response = await api.delete(`/deleteuser/${userId}`);

  return response.data;
}
