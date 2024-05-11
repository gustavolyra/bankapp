import { AccountRepository } from "@/repositories/account"
import { account } from "@prisma/client"
import { AccountNotFoundError } from "./errors/account-not-found-error"
import { InsufficientFundsError } from "./errors/insufficient-funds-error"

interface withdrawUseCaseRequest {
  account_id: string
  amount: number
}

interface withdrawUseCaseReply {
  origin: account
}

export class WithdrawUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ account_id, amount }: withdrawUseCaseRequest): Promise<withdrawUseCaseReply> {
    const account = await this.accountRepository.getAccount(account_id)

    if (!account) throw new AccountNotFoundError()

    if (account.balance < amount) throw new InsufficientFundsError()

    const origin = await this.accountRepository.withdraw({ account_id, amount })

    return { origin }
  }
}