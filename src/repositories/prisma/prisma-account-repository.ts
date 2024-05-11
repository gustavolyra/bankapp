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

  getAccount(account_id: string): Promise<{ id: string; balance: number; } | null> {
    throw new Error("Method not implemented.");
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

  withdraw(data: withdrawRequest): Promise<{ id: string; balance: number; }> {
    throw new Error("Method not implemented.");
  }
  transfer(data: transferRequest): Promise<transferReply | null> {
    throw new Error("Method not implemented.");
  }
}