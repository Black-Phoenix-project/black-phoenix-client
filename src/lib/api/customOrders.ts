import apiClient from "./client";

export const customOrdersApi = {
  create: async (payload: {
    name: string;
    phone: string;
    email?: string;
    category?: string;
    requirements: string;
  }) => {
    const { data } = await apiClient.post("/api/custom-orders", payload);
    return data;
  },
};
