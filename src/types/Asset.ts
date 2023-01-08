import { v4 as uuidv4 } from 'uuid';
import { CurrencyCode } from './currencies';

export class Asset {
  name: string;
  id: string;
  currency: CurrencyCode;
  balance: number;
  openDate: string;
  closeDate?: string;
  description?: string;

  constructor({
    name,
    currency,
    balance,
    openDate,
    closeDate,
    description,
  }: Omit<Asset, 'id'>) {
    this.name = name;
    this.id = uuidv4();
    this.currency = currency;
    this.balance = balance;
    this.openDate = openDate;
    this.closeDate = closeDate;
    this.description = description;
  }
}

export type BlankAsset = {
  name: null;
  id: null;
  currency: CurrencyCode | null;
};
