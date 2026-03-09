import apiClient from "./client";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types";

const normalizePhoneForBackend = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const normalizedPayload: LoginPayload = {
      ...payload,
      phoneNumber: normalizePhoneForBackend(payload.phoneNumber),
    };
    const { data } = await apiClient.post<AuthResponse>(
      "/api/client-auth/login",
      normalizedPayload
    );
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const normalizedPayload: RegisterPayload = {
      ...payload,
      phoneNumber: normalizePhoneForBackend(payload.phoneNumber),
      fullName: payload.fullName?.trim() || undefined,
    };
    const { data } = await apiClient.post<AuthResponse>(
      "/api/client-auth/register",
      normalizedPayload
    );
    return data;
  },
};
