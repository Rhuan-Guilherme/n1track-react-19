import { api } from "@/lib/axios";

interface createTransferApiRequest {
  name: string;
  ramal: string;
  destinatario: string;
}

export async function createTransferApi(body: createTransferApiRequest) {
  const response = await api.post("/ticket/create", {
    ...body,
    type: "TRANSFERENCIA",
    vip: false,
  });

  return response.data;
}
