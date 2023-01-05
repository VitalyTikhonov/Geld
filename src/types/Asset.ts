import { v4 as uuidv4 } from 'uuid';
import { CurrencyCode } from './currencies';

export class Asset {
  id: string;
  name: string;
  currency: CurrencyCode;
  balance: number;
  description?: string;

  constructor() {
    this.id = uuidv4();
    this.name = '';
    this.currency = CurrencyCode.RUR;
    this.balance = 0;
  }
}
