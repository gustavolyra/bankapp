import { AccountRepository } from "@/repositories/account"
import { account } from "@prisma/client"
import { AccountNotFoundError } from "./errors/account-not-found-error"
import { InsufficientFundsError } from "./errors/insufficient-funds-error"
import { promises } from "dns"

interface transferUseCaseRequest {
  account_id_origin: number
  account_id_destination: number
  amount: number
}

interface transferUseCaseReply {
  origin: {
    id: number
    balance: number
  }
  destination: {
    id: number
    balance: number
  }
}

export class TransferUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ account_id_origin, account_id_destination, amount }: transferUseCaseRequest): Promise<transferUseCaseReply | null> {

    const doesBothAccountExists = await this.doesBothAccountExists(account_id_origin, account_id_destination)
    if (!doesBothAccountExists) throw new AccountNotFoundError()

    const doesAccountOriginHasFunds = await this.doesAccountOriginHasFunds(account_id_origin, amount)
    if (!doesAccountOriginHasFunds) throw new InsufficientFundsError()

    const transfer = await this.accountRepository.transfer({ account_id_origin, account_id_destination, amount })

    return transfer
  }

  private async doesBothAccountExists(account_id_origin: number, account_id_destination: number): Promise<Boolean> {
    const accountOriginExist = await this.accountRepository.doesAccountExist(account_id_origin)
    const accountDestinationExist = await this.accountRepository.doesAccountExist(account_id_destination)

    if (!accountOriginExist || !accountDestinationExist) {
      return false
    }
    return true
  }

  private async doesAccountOriginHasFunds(account_id_origin: number, amount: number): Promise<Boolean> {
    const accountOrigin = await this.accountRepository.getAccount(account_id_origin)
    if (!accountOrigin) return false
    if (accountOrigin.balance < amount) return false
    return true
  }
}