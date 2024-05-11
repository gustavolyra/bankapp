import { beforeEach, describe, expect, it } from "vitest";
import { GetBalanceUseCase } from "../get-balance";
import { randomInt } from "crypto";
import { AccountNotFoundError } from "../errors/account-not-found-error";
import { InMemoryAccountRepository } from "../../repositories/in-memory/in-memory-account-repository";


describe('Check account balance', () => {

  let accountRepository: InMemoryAccountRepository
  let sut: GetBalanceUseCase

  describe('Check account balance', () => {
    beforeEach(() => {
      accountRepository = new InMemoryAccountRepository()
      sut = new GetBalanceUseCase(accountRepository)
    })

    it('should be able to check account balance', async () => {
      const newAccount = await accountRepository.create({ id: '1', balance: 100 })
      const { balance } = await sut.execute({
        account_id: newAccount.id
      })

      expect(balance).toEqual(100)
    })

    it('should not be able to check balance for non-existing account', async () => {
      await expect(() =>
        sut.execute({
          account_id: randomInt(100).toString()
        }),
      ).rejects.toBeInstanceOf(AccountNotFoundError)
    })

  })
})