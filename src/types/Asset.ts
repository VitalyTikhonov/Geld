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

  constructor() {
    this.name = '';
    this.id = uuidv4();
    this.currency = CurrencyCode.RUR;
    this.balance = 0;
    // eslint-disable-next-line prefer-destructuring
    this.openDate = new Date().toISOString().split('T')[0];
  }
}
