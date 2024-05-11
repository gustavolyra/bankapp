import { AccountRepository } from "@/repositories/account";

export class ResetUseCase {

  constructor(private accountRepository: AccountRepository) {}

  async execute(): Promise<void> {
    await this.accountRepository.reset()
  }
}