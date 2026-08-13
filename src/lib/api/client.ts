import axios from "axios";
import { PUBLIC_API_URL } from "./baseUrl";
import { useAuthStore } from "@/store/authStore";

export const apiClient = axios.create({
  baseURL: PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT from localStorage on every request (client-side only)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response error normalizer + stale-token cleanup
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      useAuthStore.getState().logout();
    }
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Произошла ошибка";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
