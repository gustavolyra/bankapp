import { AccountRepository } from "@/repositories/account";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAccountUseCase } from "../create-account";
import { InMemoryAccountRepository } from "../../repositories/in-memory/in-memory-account-repository";


describe('Create an Account', () => {

  let accountRepository: InMemoryAccountRepository
  let sut: CreateAccountUseCase

  describe('Register a new Account', () => {
    beforeEach(() => {
      accountRepository = new InMemoryAccountRepository()
      sut = new CreateAccountUseCase(accountRepository)
    })

    it('should be able to register a new account', async () => {
      const { account } = await sut.execute({
        account_id: '100',
        amount: 100
      })

      expect(account.id).toEqual(expect.any(String))
    })
  })
})