import { api } from "@/lib/axios";

interface createCalledApiRequest {
  name: string;
  login: string;
  ramal: string;
  patrimonio: string;
  informacao: string;
  local: string;
}

export async function createCalledApi(body: createCalledApiRequest) {
  const response = await api.post("/ticket/create", {
    ...body,
    type: "CHAMADO",
    vip: false,
  });

  return response.data;
}
