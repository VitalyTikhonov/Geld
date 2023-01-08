import { v4 as uuidv4 } from 'uuid';
import { CurrencyCode } from './currencies';

export class Operation {
  id: string;
  timestamp: string;
  creditAssetId?: string;
  creditCurrencyCode?: CurrencyCode;
  creditOpAmount: number;
  creditTrAmount: number;
  debitAssetId?: string;
  debitCurrencyCode?: CurrencyCode;
  debitOpAmount: number;
  debitTrAmount: number;
  rate?: number;
  categories?: Array<string>;
  comments?: string;
  transactionId?: string;
  constructor() {
    this.id = uuidv4();
    // eslint-disable-next-line prefer-destructuring
    this.timestamp = new Date().toISOString().split('T')[0];
    this.creditOpAmount = 0;
    this.creditTrAmount = 0;
    this.debitOpAmount = 0;
    this.debitTrAmount = 0;
  }
}
