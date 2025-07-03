import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("@n1track/token")}`,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@n1track/token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    // Retorna a resposta normalmente se não houver erro
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Requisição não autorizada (401):", error.response);
      toast.error("Usuário inativo!");
      setTimeout(() => {
        localStorage.removeItem("@n1track/token");
      }, 5000);
    }

    return Promise.reject(error);
  },
);
