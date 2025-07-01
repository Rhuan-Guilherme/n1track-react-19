import { api } from "@/lib/axios";

interface ResetPasswordApiRequest {
  code: string;
  newPassword: string;
  email: string;
}

export async function resetPasswordApi(body: ResetPasswordApiRequest) {
  const response = await api.post("/reset/password", {
    ...body,
  });

  return response.data;
}
