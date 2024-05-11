import { Prisma, account } from '@prisma/client'

export interface depositRequest {
  account_id: number
  amount: number
}
export interface withdrawRequest {
  account_id: number
  amount: number
}
export interface transferRequest {
  account_id_origin: number
  account_id_destination: number
  amount: number
}
export interface transferReply {
  origin: {
    id: number
    balance: number
  }
  destination: {
    id: number
    balance: number
  }
}

export interface AccountRepository {
  create(data: Prisma.accountUncheckedCreateInput): Promise<account>
  getAccount(account_id: number): Promise<account | null>
  doesAccountExist(account_id: number): Promise<boolean>
  deposit(data: depositRequest): Promise<account>
  withdraw(data: withdrawRequest): Promise<account>
  transfer(data: transferRequest): Promise<transferReply | null>
}