import { AccountNotFoundError } from "@/use-cases/errors/account-not-found-error";
import { makeGetBalanceUseCase } from "@/use-cases/factories/make-get-balance-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function balance(request: FastifyRequest, reply: FastifyReply) {
  const balanceSchemaQuery = z.object({
    account_id: z.string()
  })

  const { account_id } = balanceSchemaQuery.parse(request.query)

  const getBalanceUseCase = makeGetBalanceUseCase()
  try {
    const account = await getBalanceUseCase.execute({ account_id })

    return reply.status(200).send(account.balance)
  } catch (err) {
    if (err instanceof (AccountNotFoundError))
      return reply.status(404).send(0)
  }
}