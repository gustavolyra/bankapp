import { PrismaAccountRepository } from "@/repositories/prisma/prisma-account-repository";
import { CreateAccountUseCase } from "../create-account";


export function makeCreateAccountUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const createAccountUseCase = new CreateAccountUseCase(accountRepository)

  return createAccountUseCase
}