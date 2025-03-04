import { api } from "@/lib/axios";

export async function removeVipStfuser(id: string) {
  const response = await api.patch(`/stfusers/vipremove/${id}`);

  return response.data;
}
