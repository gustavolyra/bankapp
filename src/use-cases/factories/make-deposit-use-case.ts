import { PrismaAccountRepository } from "@/repositories/prisma/prisma-account-repository";
import { DepositUseCase } from "../deposit";

export function makeDepositUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const depositUseCase = new DepositUseCase(accountRepository)

  return depositUseCase
}