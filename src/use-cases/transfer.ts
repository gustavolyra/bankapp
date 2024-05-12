import { AccountRepository } from "@/repositories/account"
import { account } from "@prisma/client"
import { AccountNotFoundError } from "./errors/account-not-found-error"
import { InsufficientFundsError } from "./errors/insufficient-funds-error"
import { promises } from "dns"

interface transferUseCaseRequest {
  account_id_origin: string
  account_id_destination: string
  amount: number
}

interface transferUseCaseReply {
  origin: {
    id: string
    balance: number
  }
  destination: {
    id: string
    balance: number
  }
}

export class TransferUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ account_id_origin, account_id_destination, amount }: transferUseCaseRequest): Promise<transferUseCaseReply | null> {

    const doesAccountOriginExist = await this.doesAccountExist(account_id_origin)
    if (!doesAccountOriginExist) throw new AccountNotFoundError()

    const accountOriginBalance = await this.accountOriginBalance(account_id_origin, amount)
    if (accountOriginBalance < amount) {
      throw new InsufficientFundsError(accountOriginBalance)
    }

    const doesAccountDestinationExist = await this.doesAccountExist(account_id_destination)
    if (!doesAccountDestinationExist) {
      const account = await this.accountRepository.create({ id: account_id_destination, balance: 0 })
    }

    const transfer = await this.accountRepository.transfer({ account_id_origin, account_id_destination, amount })

    return transfer
  }

  private async doesAccountExist(account_id: string): Promise<Boolean> {
    const accountExist = await this.accountRepository.doesAccountExist(account_id)
    if (!accountExist) return false
    return true
  }

  private async accountOriginBalance(account_id_origin: string, amount: number): Promise<number> {
    const accountOrigin = await this.accountRepository.getAccount(account_id_origin)
    if (!accountOrigin) return 0
    return accountOrigin.balance
  }
}