import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAccountRepository } from "../../repositories/in-memory/in-memory-account-repository";
import { WithdrawUseCase } from "../withdraw";
import { AccountNotFoundError } from "../errors/account-not-found-error";
import { InsufficientFundsError } from "../errors/insufficient-funds-error";


describe('Make a Withdraw', () => {

  let accountRepository: InMemoryAccountRepository
  let sut: WithdrawUseCase

  describe('Make a Withdraw', () => {
    beforeEach(() => {
      accountRepository = new InMemoryAccountRepository()
      sut = new WithdrawUseCase(accountRepository)
    })

    it('should not be able to withdraw from a not exists account', async () => {
      const account_id = 1
      const balance = 100
      await expect(() =>
        sut.execute({
          account_id,
          amount: balance
        }),
      ).rejects.toBeInstanceOf(AccountNotFoundError)
    })
    it('should not be able to withdraw from an account with less balance than the amount', async () => {
      const account_id = 1
      const balance = 100
      const withdrawAmount = 200

      const newAccount = await accountRepository.create({ id: account_id, balance })

      await expect(() =>
        sut.execute({
          account_id,
          amount: withdrawAmount
        }),
      ).rejects.toBeInstanceOf(InsufficientFundsError)
    })

    it('should be able to withdraw money from an existing  account', async () => {
      const account_id = 1
      const balance = 100
      const withdrawAmount = 50

      const newAccount = await accountRepository.create({ id: account_id, balance })
      const { origin } = await sut.execute({
        account_id,
        amount: withdrawAmount
      })

      expect(origin.id).toEqual(account_id)
      expect(origin.balance).toEqual(balance - withdrawAmount)
    })
  })
})