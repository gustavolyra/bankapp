import { AccountRepository } from "@/repositories/account"
import { account } from "@prisma/client"

interface depositUseCaseRequest {
  account_id: string
  amount: number
}

interface depositUseCaseReply {
  account: account
}

export class DepositUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ account_id, amount }: depositUseCaseRequest): Promise<depositUseCaseReply> {
    const accountExist = await this.accountRepository.doesAccountExist(account_id)

    if (accountExist) {
      const account = await this.accountRepository.deposit({ account_id, amount })

      return { account }
    }
    else {
      const account = await this.accountRepository.create({ id: account_id, balance: amount })

      return { account }
    }
  }
}