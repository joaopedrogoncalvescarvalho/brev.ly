import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db/connection";
import { links } from "../db/schema";
import { eq, sql, desc } from "drizzle-orm";
import {
  isValidUrl,
  normalizeUrl,
  isValidShortCode,
  generateRandomShortCode,
} from "../utils/url-validation";

const createLinkSchema = z.object({
  originalUrl: z.string().min(1, "URL is required"),
  shortUrl: z.string().optional(),
});

export async function linksRoutes(fastify: FastifyInstance) {
  fastify.post("/links", async (request, reply) => {
    const body = createLinkSchema.parse(request.body);

    const normalizedUrl = normalizeUrl(body.originalUrl);
    if (!isValidUrl(normalizedUrl)) {
      return reply.status(400).send({
        error: "Invalid original URL",
      });
    }

    let shortUrl = body.shortUrl;
    if (shortUrl) {
      if (!isValidShortCode(shortUrl)) {
        return reply.status(400).send({
          error:
            "Invalid short URL format. Use only letters, numbers, _ and - (3-10 characters)",
        });
      }

      const existingLink = await db
        .select()
        .from(links)
        .where(eq(links.shortUrl, shortUrl))
        .limit(1);

      if (existingLink.length > 0) {
        return reply.status(409).send({
          error: "Short URL already exists",
        });
      }
    } else {
      let attempts = 0;
      do {
        shortUrl = generateRandomShortCode();
        const existing = await db
          .select()
          .from(links)
          .where(eq(links.shortUrl, shortUrl))
          .limit(1);

        if (existing.length === 0) break;
        attempts++;
      } while (attempts < 10);

      if (attempts >= 10) {
        return reply.status(500).send({
          error: "Unable to generate a unique short URL",
        });
      }
    }

    const [newLink] = await db
      .insert(links)
      .values({
        originalUrl: normalizedUrl,
        shortUrl: shortUrl!,
      })
      .returning();

    return reply.status(201).send(newLink);
  });

  fastify.get("/links", async (request, reply) => {
    const allLinks = await db
      .select()
      .from(links)
      .orderBy(desc(links.createdAt));
    return reply.send(allLinks);
  });

  fastify.get("/links/:shortUrl", async (request, reply) => {
    const { shortUrl } = request.params as { shortUrl: string };

    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.shortUrl, shortUrl))
      .limit(1);

    if (!link) {
      return reply.status(404).send({
        error: "Link not found",
      });
    }

    return reply.send(link);
  });

  fastify.delete("/links/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const [deletedLink] = await db
      .delete(links)
      .where(eq(links.id, id))
      .returning();

    console.log(deletedLink);

    if (!deletedLink) {
      return reply.status(404).send({
        error: "Link not found",
      });
    }

    return reply.status(204).send();
  });

  fastify.patch("/links/:shortUrl/increment", async (request, reply) => {
    const { shortUrl } = request.params as { shortUrl: string };

    const [updatedLink] = await db
      .update(links)
      .set({
        accessCount: sql`${links.accessCount} + 1`,
      })
      .where(eq(links.shortUrl, shortUrl))
      .returning();

    if (!updatedLink) {
      return reply.status(404).send({
        error: "Link not found",
      });
    }

    return reply.send(updatedLink);
  });

  fastify.patch("/links/:id/metrics", async (request, reply) => {
    const { id } = request.params as { id: string };

    const [updatedLink] = await db
      .update(links)
      .set({
        accessCount: sql`${links.accessCount} + 1`,
      })
      .where(eq(links.id, id))
      .returning();

    if (!updatedLink) {
      return reply.status(404).send({
        error: "Link not found",
      });
    }

    return reply.send(updatedLink);
  });

  fastify.get("/:shortUrl", async (request, reply) => {
    const { shortUrl } = request.params as { shortUrl: string };

    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.shortUrl, shortUrl))
      .limit(1);

    if (!link) {
      return reply.status(404).send({
        error: "Link not found",
      });
    }

    await db
      .update(links)
      .set({
        accessCount: sql`${links.accessCount} + 1`,
      })
      .where(eq(links.shortUrl, shortUrl));

    return reply.redirect(link.originalUrl, 301);
  });
}
