import apiClient from "./client";

export interface CompanySettings {
  companyName: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  aboutText: string;
  socials: { telegram: string; instagram: string };
}

export const settingsApi = {
  get: async (): Promise<CompanySettings | null> => {
    const { data } = await apiClient.get("/api/settings");
    return data.data || null;
  },
};
