import { makeDepositUseCase } from "@/use-cases/factories/make-deposit-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function event(request: FastifyRequest, reply: FastifyReply) {

  const eventSchema = z.object({
    type: z.string(),
    destination: z.string(),
    amount: z.number()
  })

  const { type, destination, amount } = eventSchema.parse(request.body)

  switch (type) {
    case "deposit":
      const depositUseCase = makeDepositUseCase()
      const { account } = await depositUseCase.execute({ account_id: destination, amount })
      return reply.status(201).send({ destination: account })
      break;
    case "withdraw":
      break;
  }
}


// # Deposit into existing account

// POST /event {"type":"deposit", "destination":"100", "amount":10}

// 201 {"destination": {"id":"100", "balance":20}}