import { api } from "@/lib/axios";

interface updateStfuserProps {
  name: string;
  login: string;
  area: string;
  cargo: string;
  vip: boolean;
}

export async function updateStfuser(
  id: string,
  { area, cargo, login, name }: updateStfuserProps,
) {
  const response = await api.put(`/stfusers/update/${id}`, {
    area,
    cargo,
    name,
    login,
  });

  return response.data;
}
