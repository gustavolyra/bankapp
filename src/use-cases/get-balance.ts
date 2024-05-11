import { AccountRepository } from "@/repositories/account"
import { AccountNotFoundError } from "./errors/account-not-found-error"

interface getBalanceUseCaseRequest {
  account_id: number
}

interface getBalanceUseCaseReply {
  balance: number
}

export class GetBalanceUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ account_id }: getBalanceUseCaseRequest): Promise<getBalanceUseCaseReply> {
    const account = await this.accountRepository.getAccount(account_id)

    if (!account) throw new AccountNotFoundError()

    const balance = account.balance
    return { balance }
  }
}