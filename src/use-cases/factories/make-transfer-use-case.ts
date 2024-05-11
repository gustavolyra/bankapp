import { PrismaAccountRepository } from "@/repositories/prisma/prisma-account-repository";
import { TransferUseCase } from "../transfer";

export function makeTransferUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const transferUseCase = new TransferUseCase(accountRepository)

  return transferUseCase
}