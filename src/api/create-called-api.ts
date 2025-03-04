import { api } from "@/lib/axios";

interface createCalledApiRequest {
  name: string;
  login: string;
  ramal: string;
  patrimono: string;
  informacao: string;
  local: string;
  area: string;
  cargo: string;
  vip: boolean;
}

export async function createCalledApi(body: createCalledApiRequest) {
  const response = await api.post("/ticket/create", {
    ...body,
    type: "CHAMADO",
  });

  return response.data;
}
