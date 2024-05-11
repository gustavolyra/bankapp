import { Prisma, account } from "@prisma/client";
import { AccountRepository, depositRequest, transferRequest, withdrawRequest } from "../account";
import { randomInt } from "crypto";

export class InMemoryAccountRepository implements AccountRepository {

  public items: account[] = []

  async doesAccountExist(account_id: number): Promise<boolean> {
    const account = this.items.find((item) => item.id = account_id)

    if (!account) return false
    return true
  }
  async create(data: Prisma.accountUncheckedCreateInput) {
    const account = {
      id: data.id ?? randomInt(100),
      balance: data.balance
    }

    this.items.push(account)

    return account
  }

  async getAccount(account_id: number) {
    const account = this.items.find((item) => item.id = account_id)

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

  transfer(data: transferRequest): Promise<{ id: number; balance: number; }> {
    throw new Error("Method not implemented.");
  }
}