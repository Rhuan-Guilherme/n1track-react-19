import axios from "axios";

export const api = axios.create({
  baseURL: "https://n1track-node.onrender.com",
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
