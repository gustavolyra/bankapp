import { Prisma } from "@prisma/client";
import { AccountRepository, depositRequest, transferReply, transferRequest, withdrawRequest } from "../account";
import { prisma } from "@/lib/prisma";


export class PrismaAccountRepository implements AccountRepository {

  async reset() {
    await prisma.account.deleteMany({})
  }

  async create(data: Prisma.accountUncheckedCreateInput): Promise<{ id: string; balance: number; }> {
    const account = await prisma.account.create({ data })
    return account
  }

  async getAccount(account_id: string): Promise<{ id: string; balance: number; } | null> {
    const account = await prisma.account.findUnique({
      where: {
        id: account_id
      }
    })
    return account
  }

  async doesAccountExist(account_id: string): Promise<boolean> {
    const account = await prisma.account.findUnique({
      where: {
        id: account_id
      }
    })
    if (account) return true
    return false
  }

  async deposit({ account_id, amount }: depositRequest): Promise<{ id: string; balance: number; }> {
    const account = await prisma.account.update({
      where: {
        id: account_id
      },
      data: {
        balance: {
          increment: amount
        }
      }
    })
    return account
  }

  async withdraw({ account_id, amount }: withdrawRequest): Promise<{ id: string; balance: number; }> {
    const account = await prisma.account.update({
      where: {
        id: account_id
      },
      data: {
        balance: {
          decrement: amount
        }
      }
    })
    return account
  }

  //TODO refactor
  async transfer({ account_id_origin, account_id_destination, amount }: transferRequest): Promise<transferReply | null> {
    const accountOrigin = await this.withdraw({ account_id: account_id_origin, amount })
    const accountDestination = await this.withdraw({ account_id: account_id_destination, amount })

    return { origin: accountOrigin, destination: accountDestination }
  }
}