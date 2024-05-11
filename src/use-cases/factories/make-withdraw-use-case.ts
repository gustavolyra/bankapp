import { PrismaAccountRepository } from "@/repositories/prisma/prisma-account-repository";
import { WithdrawUseCase } from "../withdraw";


export function makeWithdrawUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const withdrawUseCase = new WithdrawUseCase(accountRepository)

  return withdrawUseCase
}