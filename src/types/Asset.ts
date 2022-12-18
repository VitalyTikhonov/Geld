import { CurrencyCode } from './currencies';

export class Asset {
  id: string;
  name: string;
  currency: CurrencyCode;
  balance: number;
  description: string;
  constructor({ id, name, currency, balance, description }: Asset) {
    this.id = id;
    this.name = name;
    this.currency = currency || CurrencyCode.RUR;
    this.balance = balance;
    this.description = description;
  }
}
