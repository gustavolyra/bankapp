import { makeResetUseCase } from "@/use-cases/factories/make-reset-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export async function reset(request: FastifyRequest, reply: FastifyReply) {
  try {
    const resetUseCase = makeResetUseCase();
    await resetUseCase.execute();

    return reply.status(200).send("OK");
  } catch (error) {
    console.error("Error in reset route:", error);
    return reply.status(500).send({ message: error });
  }
}

