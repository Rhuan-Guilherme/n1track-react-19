import { api } from "@/lib/axios";

export async function getTopStfUsers() {
  const response = await api.get("/stfusers/topusers");

  return response.data;
}
