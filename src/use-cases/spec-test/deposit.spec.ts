import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAccountRepository } from "../../repositories/in-memory/in-memory-account-repository";
import { DepositUseCase } from "../deposit";


describe('Make a Deposit', () => {

  let accountRepository: InMemoryAccountRepository
  let sut: DepositUseCase

  describe('Make a Deposit', () => {
    beforeEach(() => {
      accountRepository = new InMemoryAccountRepository()
      sut = new DepositUseCase(accountRepository)
    })

    it('should be able to create an account when make a deposit', async () => {
      const account_id = "1"
      const balance = 100
      const { account } = await sut.execute({
        account_id,
        amount: balance
      })

      expect(account.id).toEqual(account_id)
      expect(account.balance).toEqual(balance)
    })

    it('should be able to make a deposit in an account that already exists', async () => {
      const account_id = "1"
      const balance = 100
      const depositAmount = 200

      const newAccount = await accountRepository.create({ id: account_id, balance })
      const { account } = await sut.execute({
        account_id,
        amount: depositAmount
      })

      expect(account.id).toEqual(account_id)
      expect(account.balance).toEqual(balance + depositAmount)
    })
  })
})