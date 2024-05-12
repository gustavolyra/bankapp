import { Prisma, account } from "@prisma/client";
import { AccountRepository, depositRequest, transferReply, transferRequest, withdrawRequest } from "../account";
import { randomInt } from "crypto";

export class InMemoryAccountRepository implements AccountRepository {
  public items: account[] = []

  async reset() {
    this.items = []
  }

  async create({ id, balance }: Prisma.accountCreateInput) {
    const account = {
      id,
      balance: balance ?? 0
    }
    this.items.push(account)

    return account
  }

  async doesAccountExist(account_id: string): Promise<boolean> {
    const account = this.items.find((item) => item.id === account_id)

    if (!account) return false
    return true
  }


  async getAccount(account_id: string) {
    const account = this.items.find((item) => item.id === account_id)

    if (!account) return null
    return account
  }

  async deposit({ account_id, amount }: depositRequest) {
    const accountIndex = this.items.findIndex((item) => item.id === account_id)
    if (accountIndex >= 0) {
      const balance = this.items[accountIndex].balance
      this.items[accountIndex].balance = balance + amount
    }
    return this.items[accountIndex]
  }

  async withdraw({ account_id, amount }: withdrawRequest) {
    const accountIndex = this.items.findIndex((item) => item.id === account_id)
    if (accountIndex >= 0) {
      const balance = this.items[accountIndex].balance
      if (balance >= amount)
        this.items[accountIndex].balance = balance - amount
    }
    return this.items[accountIndex]
  }

  async transfer({ account_id_destination, account_id_origin, amount }: transferRequest): Promise<transferReply | null> {
    const accountOrigin = await this.getAccount(account_id_origin)
    const accountDestination = await this.getAccount(account_id_destination)

    if (!accountOrigin) return null

    const origin = await this.withdraw({ account_id: account_id_origin, amount })

    if (!accountDestination) {
      this.create({ id: account_id_destination, balance: amount })
      return {
        origin,
        destination: {
          id: account_id_destination,
          balance: amount
        }
      }
    } else {
      const destination = await this.deposit({ account_id: account_id_destination, amount })
      return {
        origin,
        destination
      }
    }
  }
}
