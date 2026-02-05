import Fastify from "fastify";
import cors from "@fastify/cors";
import { env } from "./env";
import { linksRoutes } from "./routes/links";
import { exportRoutes } from "./routes/export";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

fastify.register(linksRoutes);
fastify.register(exportRoutes);

fastify.get("/health", async (request, reply) => {
  return reply.send({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

const start = async () => {
  try {
    await fastify.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });

    console.log(`🚀 Servidor rodando na porta ${env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
