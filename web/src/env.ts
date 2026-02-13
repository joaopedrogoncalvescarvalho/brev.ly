import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().default("http://localhost:3333"),
  VITE_BACKEND_URL: z.string().default("http://localhost:3333"), // Alias for backward compatibility
  VITE_FRONTEND_URL: z.string().default("http://localhost:3000"),
});

export const env = envSchema.parse(import.meta.env);
