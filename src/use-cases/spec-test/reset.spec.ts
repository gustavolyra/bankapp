import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAccountRepository } from "../../repositories/in-memory/in-memory-account-repository";
import { ResetUseCase } from "../reset";


describe('Reset Database', () => {

  let accountRepository: InMemoryAccountRepository
  let sut: ResetUseCase

  describe('Reset Database', () => {
    beforeEach(() => {
      accountRepository = new InMemoryAccountRepository()
      sut = new ResetUseCase(accountRepository)
    })


    it('should be able to reset database', async () => {
      const account_id = '1'
      const newAccount = await accountRepository.create({ id: account_id, balance: 100 })
      await sut.execute()

      const doesAccountExist = await accountRepository.doesAccountExist(account_id)
      expect(doesAccountExist).toEqual(false)
    })
  })
})