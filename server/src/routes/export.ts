import { FastifyInstance } from "fastify";
import { db } from "../db/connection";
import { links } from "../db/schema";
import { storageProvider } from "../providers/storage";

export async function exportRoutes(fastify: FastifyInstance) {
  fastify.get("/export/csv", async (request, reply) => {
    try {
      const allLinks = await db.select().from(links);

      const csvHeader = "ID;Original URL;Short URL;Access Count;Created Date\n";
      const csvContent = allLinks
        .map((link) => {
          const createdAt = link.createdAt.toISOString().split("T")[0];
          return `${link.id};"${link.originalUrl}";"${link.shortUrl}";${link.accessCount};"${createdAt}"`;
        })
        .join("\n");

      const csvData = csvHeader + csvContent;

      const fileUrl = await storageProvider.upload(csvData, "text/csv", "csv");

      return reply.send({
        message: "CSV generated successfully",
        downloadUrl: fileUrl,
        totalRecords: allLinks.length,
      });
    } catch (error) {
      console.error("Error generating CSV:", error);
      return reply.status(500).send({
        error: "Internal server error while generating CSV",
      });
    }
  });
}
