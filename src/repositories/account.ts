import { Prisma, account } from '@prisma/client'

export interface depositRequest {
  account_id: string
  amount: number
}
export interface withdrawRequest {
  account_id: string
  amount: number
}
export interface transferRequest {
  account_id_origin: string
  account_id_destination: string
  amount: number
}
export interface transferReply {
  origin: {
    id: string
    balance: number
  }
  destination: {
    id: string
    balance: number
  }
}

export interface AccountRepository {
  reset(): void
  create(data: Prisma.accountCreateInput): Promise<account>
  getAccount(account_id: string): Promise<account | null>
  doesAccountExist(account_id: string): Promise<boolean>
  deposit(data: depositRequest): Promise<account>
  withdraw(data: withdrawRequest): Promise<account>
  transfer(data: transferRequest): Promise<transferReply | null>
}