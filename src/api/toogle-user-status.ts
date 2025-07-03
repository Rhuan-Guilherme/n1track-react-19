import { api } from "@/lib/axios";

export async function toogleUserStatus(userId: string, isActive: boolean) {
  const response = await api.patch(`/alteruser`, {
    id: userId,
    is_active: isActive,
    role: "USER",
  });

  return response.data;
}
