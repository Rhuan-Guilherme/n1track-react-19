import { api } from "@/lib/axios";

interface createBindsRequest {
  title: string;
  description: string;
}

export async function createBindsApi(body: createBindsRequest) {
  const response = await api.post("/binds/create", {
    ...body,
  });

  return response.data;
}
