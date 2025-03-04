import { api } from "@/lib/axios";

export async function formatTextApi(text: string) {
  const response = await api.post("/api/formattext", { text });

  return response.data;
}
