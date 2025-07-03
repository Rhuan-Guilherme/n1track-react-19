import { api } from "@/lib/axios";

interface GetUserResponse {
  users: {
    id: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
    is_active: boolean;
  }[];
}

export async function getAllUsersManagementApi() {
  const response = await api.get("/allusers");

  return response.data as GetUserResponse;
}
