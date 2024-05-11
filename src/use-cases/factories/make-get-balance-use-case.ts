import { PrismaAccountRepository } from "@/repositories/prisma/prisma-account-repository";
import { GetBalanceUseCase } from "../get-balance";


export function makeGetBalanceUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const getBalanceUseCase = new GetBalanceUseCase(accountRepository)

  return getBalanceUseCase
}