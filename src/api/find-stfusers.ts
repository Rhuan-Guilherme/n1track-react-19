import { api } from "@/lib/axios";

export async function findStfUsers(params: string) {
  const response = await api.get(`/stfusers/${params}`);

  return response.data;
}
