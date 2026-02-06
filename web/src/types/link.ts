export interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
}

export interface CreateLinkRequest {
  originalUrl: string;
  shortUrl?: string;
}

export interface CreateLinkResponse extends Link {}

export interface ExportCSVResponse {
  message: string;
  downloadUrl: string;
  totalRecords: number;
}

export interface ApiError {
  error: string;
}
