export class InsufficientFundsError extends Error {
  balance: number

  constructor(balance: number) {
    super('Insufficient Funds Error!')
    this.balance = balance
  }
}
