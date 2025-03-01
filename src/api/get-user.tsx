import { api } from "@/lib/axios";

interface GetUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
    is_active: boolean;
  };
}

export async function getUserApi() {
  const response = await api.get("/profile");

  return response.data as GetUserResponse;
}
