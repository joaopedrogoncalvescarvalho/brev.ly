import axios from "axios";
import {
  Link,
  CreateLinkRequest,
  CreateLinkResponse,
  ExportCSVResponse,
} from "../types/link";
import { env } from "../env";

const api = axios.create({
  baseURL: env.VITE_BACKEND_URL,
});

export const linkService = {
  async createLink(data: CreateLinkRequest): Promise<CreateLinkResponse> {
    const response = await api.post<CreateLinkResponse>("/links", data);
    return response.data;
  },

  async getLinks(): Promise<Link[]> {
    const response = await api.get<Link[]>("/links");
    return response.data;
  },

  async getLinkByShortUrl(shortUrl: string): Promise<Link> {
    const response = await api.get<Link>(`/links/${shortUrl}`);
    return response.data;
  },

  async deleteLink(id: string): Promise<void> {
    await api.delete(`/links/${id}`);
  },

  async incrementAccessCount(shortUrl: string): Promise<Link> {
    const response = await api.patch<Link>(`/links/${shortUrl}/increment`);
    return response.data;
  },

  async exportCSV(): Promise<ExportCSVResponse> {
    const response = await api.get<ExportCSVResponse>("/export/csv");
    return response.data;
  },

  async resolveShortUrl(shortUrl: string): Promise<string> {
    const response = await api.get<{ originalUrl: string }>(
      `/links/${shortUrl}`,
    );
    return response.data.originalUrl;
  },
};
