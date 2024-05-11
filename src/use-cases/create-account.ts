import { AccountRepository } from "@/repositories/account"
import { account } from "@prisma/client"

interface createAccountUseCaseRequest {
  account_id?: number
  amount: number
}

interface createAccountUseCaseReply {
  account: account
}

export class CreateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ account_id, amount }: createAccountUseCaseRequest): Promise<createAccountUseCaseReply> {
    const account = await this.accountRepository.create({ id: account_id, balance: amount })

    return { account }
  }
}