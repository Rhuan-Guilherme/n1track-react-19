import { api } from "@/lib/axios";

export async function getTopStfUsersMonth() {
  const response = await api.get("/stfusers/topusers/month");

  return response.data;
}
