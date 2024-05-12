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

    const doesBothAccountExists = await this.doesBothAccountExists(account_id_origin, account_id_destination)
    if (!doesBothAccountExists) throw new AccountNotFoundError()

    const accountOriginBalance = await this.accountOriginBalance(account_id_origin, amount)
    if (accountOriginBalance < amount) {
      throw new InsufficientFundsError(accountOriginBalance)
    }

    const transfer = await this.accountRepository.transfer({ account_id_origin, account_id_destination, amount })

    return transfer
  }

  private async doesBothAccountExists(account_id_origin: string, account_id_destination: string): Promise<Boolean> {
    const accountOriginExist = await this.accountRepository.doesAccountExist(account_id_origin)
    const accountDestinationExist = await this.accountRepository.doesAccountExist(account_id_destination)

    if (!accountOriginExist || !accountDestinationExist) {
      return false
    }
    return true
  }

  private async accountOriginBalance(account_id_origin: string, amount: number): Promise<number> {
    const accountOrigin = await this.accountRepository.getAccount(account_id_origin)
    if (!accountOrigin) return 0
    return accountOrigin.balance
  }
}