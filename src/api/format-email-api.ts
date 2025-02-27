import { api } from "@/lib/axios";

export async function formatEmailApi(text: string) {
  const response = await api.post("/api/formatemail", { text });

  return response.data;
}
