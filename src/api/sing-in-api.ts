import { api } from "@/lib/axios";

interface SingInRequest {
  email: string;
  password: string;
}

interface SingInResponse {
  token: string;
}

export async function singInApi({ email, password }: SingInRequest) {
  const response = await api.post("/session", { email, password });

  return response.data as SingInResponse;
}
