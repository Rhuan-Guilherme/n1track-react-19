import { api } from "@/lib/axios";

interface createCriticalRequest {
  title: string;
  description: string;
  link: string;
}

export async function createCriticalApi(body: createCriticalRequest) {
  const response = await api.post("/critical/create", {
    ...body,
  });

  return response.data;
}
