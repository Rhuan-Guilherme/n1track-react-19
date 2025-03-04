import { api } from "@/lib/axios";

export async function alterVipStfuser(id: string) {
  const response = await api.patch(`/stfusers/vip/${id}`);

  return response.data;
}
