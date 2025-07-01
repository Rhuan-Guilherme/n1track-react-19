import { api } from "@/lib/axios";

interface ForgotPasswordApiRequest {
  email: string;
}

export async function forgotPasswordApi(body: ForgotPasswordApiRequest) {
  const response = await api.post("/forgot/password", {
    ...body,
  });

  return response.data;
}
