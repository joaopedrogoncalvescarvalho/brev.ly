import { z } from "zod";

// Regex para validar short URL (3-10 caracteres, letters, numbers, _ e -)
const shortUrlRegex = /^[a-zA-Z0-9_-]{3,10}$/;

// Regex para validar URLs
const urlRegex =
  /^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.]*))*)?$/;

export const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .min(1, "URL é obrigatória")
    .refine((url) => urlRegex.test(url), {
      message: "URL deve ser válida e começar com http:// ou https://",
    }),
  shortUrl: z
    .string()
    .optional()
    .refine((shortUrl) => !shortUrl || shortUrlRegex.test(shortUrl), {
      message:
        "URL encurtada deve ter 3-10 caracteres (letras, números, _ e -)",
    }),
});

export type CreateLinkFormData = z.infer<typeof createLinkSchema>;
