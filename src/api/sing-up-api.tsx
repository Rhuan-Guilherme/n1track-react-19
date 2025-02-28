import { api } from "@/lib/axios";

interface singUpRequest {
  name: string;
  email: string;
  password: string;
}

interface singUpResponse {
  token: string;
}

export async function singUpApi({ name, email, password }: singUpRequest) {
  const response = await api.post("/user", { name, email, password });

  return response.data as singUpResponse;
}
