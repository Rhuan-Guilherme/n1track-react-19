import axios from "axios";

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
