import axios from "axios";
import {
  Link,
  CreateLinkRequest,
  CreateLinkResponse,
  ExportCSVResponse,
} from "../types/link";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3333",
});

export const linkService = {
  // Criar link
  async createLink(data: CreateLinkRequest): Promise<CreateLinkResponse> {
    const response = await api.post<CreateLinkResponse>("/links", data);
    return response.data;
  },

  // Listar todos os links
  async getLinks(): Promise<Link[]> {
    const response = await api.get<Link[]>("/links");
    return response.data;
  },

  // Obter link por short URL
  async getLinkByShortUrl(shortUrl: string): Promise<Link> {
    const response = await api.get<Link>(`/links/${shortUrl}`);
    return response.data;
  },

  // Deletar link
  async deleteLink(id: string): Promise<void> {
    await api.delete(`/links/${id}`);
  },

  // Incrementar contador de acesso
  async incrementAccessCount(shortUrl: string): Promise<Link> {
    const response = await api.patch<Link>(`/links/${shortUrl}/increment`);
    return response.data;
  },

  // Exportar CSV
  async exportCSV(): Promise<ExportCSVResponse> {
    const response = await api.get<ExportCSVResponse>("/export/csv");
    return response.data;
  },

  // Resolver short URL (para redirecionamento)
  async resolveShortUrl(shortUrl: string): Promise<string> {
    const response = await api.get<{ originalUrl: string }>(
      `/links/${shortUrl}`,
    );
    return response.data.originalUrl;
  },
};
