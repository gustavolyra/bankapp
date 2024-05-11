import { AccountRepository } from "@/repositories/account"
import { account } from "@prisma/client"
import { AccountNotFoundError } from "./errors/account-not-found-error"
import { InsufficientFundsError } from "./errors/insufficient-funds-error"

interface withdrawUseCaseRequest {
  account_id: string
  amount: number
}

interface withdrawUseCaseReply {
  account: account
}

export class WithdrawUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ account_id, amount }: withdrawUseCaseRequest): Promise<withdrawUseCaseReply> {
    const accountOrigin = await this.accountRepository.getAccount(account_id)

    if (!accountOrigin) throw new AccountNotFoundError()

    if (accountOrigin.balance < amount) throw new InsufficientFundsError()

    const account = await this.accountRepository.withdraw({ account_id, amount })

    return { account }
  }
}