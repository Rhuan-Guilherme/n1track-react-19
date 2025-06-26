import { api } from "@/lib/axios";

interface createStfUserRequest {
  name: string;
  login: string;
  area: string;
  cargo: string;
  vip: boolean;
}

export async function createStfUser(body: createStfUserRequest) {
  console.log(body);

  const response = await api.post("/stfusers", {
    ...body,
  });

  return response.data;
}
