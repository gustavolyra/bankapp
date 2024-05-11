import { PrismaAccountRepository } from "@/repositories/prisma/prisma-account-repository";
import { ResetUseCase } from "../reset";

export function makeResetUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const resetUseCase = new ResetUseCase(accountRepository)

  return resetUseCase
}