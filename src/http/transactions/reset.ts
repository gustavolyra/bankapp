import { makeResetUseCase } from "@/use-cases/factories/make-reset-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export async function reset(request: FastifyRequest, reply: FastifyReply) {

  const resetUseCase = makeResetUseCase()
  await resetUseCase.execute()

  return reply.status(200).send("OK")
}