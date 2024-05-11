import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAccountRepository } from "../../repositories/in-memory/in-memory-account-repository";
import { AccountNotFoundError } from "../errors/account-not-found-error";
import { InsufficientFundsError } from "../errors/insufficient-funds-error";
import { TransferUseCase } from "../transfer";


describe('Make a Transfer between to accounts', () => {

  let accountRepository: InMemoryAccountRepository
  let sut: TransferUseCase

  describe('Make a Transfer between to accounts', () => {
    beforeEach(() => {
      accountRepository = new InMemoryAccountRepository()
      sut = new TransferUseCase(accountRepository)
    })

    it('should not be able to transfer from a not exists accounts', async () => {
      const account_id_origin = 1
      const account_id_destination = 2
      const amount = 100
      await expect(() =>
        sut.execute({
          account_id_origin,
          account_id_destination,
          amount
        }),
      ).rejects.toBeInstanceOf(AccountNotFoundError)
    })

    it('should not be able to transfer to a not exist account', async () => {
      const account_id_origin = 3
      const account_id_destination = 4
      const amount = 100

      await accountRepository.create({ id: account_id_origin, balance: amount })

      await expect(() =>
        sut.execute({
          account_id_origin,
          account_id_destination,
          amount
        }),
      ).rejects.toBeInstanceOf(AccountNotFoundError)
    })

    it('should not be able to transfer from a not exist account', async () => {
      const account_id_origin = 1
      const account_id_destination = 2
      const amount = 100
      await accountRepository.create({ id: account_id_destination, balance: amount })
      await expect(() =>
        sut.execute({
          account_id_origin,
          account_id_destination,
          amount
        }),
      ).rejects.toBeInstanceOf(AccountNotFoundError)
    })

    it('should not be able to transfer when orign account has insufficient funds', async () => {
      const account_id_origin = 1
      const account_id_destination = 2
      const amount = 100

      await accountRepository.create({ id: account_id_origin, balance: 1 })
      await accountRepository.create({ id: account_id_destination, balance: 0 })
      await expect(() =>
        sut.execute({
          account_id_origin,
          account_id_destination,
          amount
        }),
      ).rejects.toBeInstanceOf(InsufficientFundsError)
    })

    it('should be able to transfer money between accounts', async () => {
      const account_id_origin = 1
      const account_id_destination = 2
      const amount = 100

      await accountRepository.create({ id: account_id_origin, balance: amount })
      await accountRepository.create({ id: account_id_destination, balance: 0 })
      const transfer = await sut.execute({
        account_id_origin,
        account_id_destination,
        amount
      })

      //TODO
      console.log(transfer)
      expect(1).toEqual(1)
    })


  })
})