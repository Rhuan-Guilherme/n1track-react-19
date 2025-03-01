import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
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

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return config;
});
