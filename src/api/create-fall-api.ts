import { api } from "@/lib/axios";

interface createFallApiRequest {
  ramal: string;
}

export async function createFallApi(body: createFallApiRequest) {
  const response = await api.post("/ticket/create", {
    ...body,
    type: "QUEDA",
    vip: false,
  });

  return response.data;
}
