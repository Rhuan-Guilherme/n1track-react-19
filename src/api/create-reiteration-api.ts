import { api } from "@/lib/axios";

interface createReiterationApiRequest {
  name: string;
  login: string;
  ramal: string;
  chamado: string;
  area: string;
  cargo: string;
  vip: boolean;
}

export async function createReiterationApi(body: createReiterationApiRequest) {
  const response = await api.post("/ticket/create", {
    ...body,
    type: "REITERACAO",
  });

  return response.data;
}
