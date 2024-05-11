import { Prisma, account } from "@prisma/client";
import { AccountRepository, depositRequest, transferRequest, withdrawRequest } from "../account";
import { randomInt } from "crypto";

export class InMemoryAccountRepository implements AccountRepository {
  public items: account[] = []

  async reset() {
    this.items = []
  }

  async create(data: Prisma.accountCreateInput) {
    const { id, balance } = data
    const account = {
      id,
      balance: balance ?? 0
    }
    this.items.push(account)

    return account
  }


  // async create(data: Prisma.accountCreateInput) {
  //   const account = {
  //     id: data.id ?? randomInt(100).toString(),
  //     balance: data.balance
  //   }

  //   this.items.push(account)

  //   return account
  // }


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

  //TODO Improve
  async transfer({ account_id_destination, account_id_origin, amount }: transferRequest) {
    const accountOriginIndex = this.items.findIndex((item) => item.id === account_id_origin)
    const accountDestinationIndex = this.items.findIndex((item) => item.id === account_id_destination)

    if (accountDestinationIndex >= 0 && accountOriginIndex >= 0) {
      const accountOriginBalance = this.items[accountOriginIndex].balance
      const accountDestinationBalance = this.items[accountOriginIndex].balance
      if (accountOriginBalance >= amount) {
        this.items[accountOriginIndex].balance = accountOriginBalance - amount
        this.items[accountDestinationIndex].balance = accountDestinationBalance - amount

        return {
          origin: {
            id: account_id_origin,
            balance: this.items[accountOriginIndex].balance
          },
          destination: {
            id: account_id_destination,
            balance: this.items[accountDestinationIndex].balance
          }
        }
      }
    }
    return null
  }
}