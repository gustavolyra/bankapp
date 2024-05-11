import { makeDepositUseCase } from "@/use-cases/factories/make-deposit-use-case";
import { makeTransferUseCase } from "@/use-cases/factories/make-transfer-use-case";
import { makeWithdrawUseCase } from "@/use-cases/factories/make-withdraw-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function event(request: FastifyRequest, reply: FastifyReply) {

  const eventSchema = z.object({
    type: z.string(),
    destination: z.string().optional(),
    origin: z.string().optional(),
    amount: z.number()
  })

  const { type, amount, destination, origin } = eventSchema.parse(request.body)
  console.log(type)
  switch (type) {
    case "deposit":
      if (!destination) return reply.status(400).send({ error: "Destination is required for deposit event" })
      await handleDeposit(reply, destination, amount)

      break;
    case "withdraw":
      if (!origin) return reply.status(400).send({ error: "Origin is required for deposit event" })
      await handleWithdraw(reply, origin, amount)

      break;

    case "transfer":
      if (!origin) return reply.status(400).send({ error: "Origin is required for deposit event" })
      if (!destination) return reply.status(400).send({ error: "Destination is required for deposit event" })

      await handleTransfer(reply, origin, destination, amount)
      break;
  }
}


async function handleDeposit(reply: FastifyReply, destination: string, amount: number) {
  const depositUseCase = makeDepositUseCase()
  const { account: depositAccount } = await depositUseCase.execute({ account_id: destination, amount })
  return reply.status(201).send({ destination: depositAccount })
}

async function handleWithdraw(reply: FastifyReply, origin: string, amount: number) {
  const withdrawUseCase = makeWithdrawUseCase()
  const { account: withdrawAccount } = await withdrawUseCase.execute({ account_id: origin, amount })
  return reply.status(201).send({ origin: withdrawAccount })
}

async function handleTransfer(reply: FastifyReply, origin: string, destination: string, amount: number) {
  const transferUseCase = makeTransferUseCase()
  const transferInformation = await transferUseCase.execute({ account_id_origin: origin, account_id_destination: destination, amount })
  return reply.status(201).send(transferInformation)
}

