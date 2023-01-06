import { v4 as uuidv4 } from 'uuid';
import { CurrencyCode } from './currencies';

export class Operation {
  id: string;
  timestamp: string;
  creditAssetId?: string;
  creditValue: number;
  creditCurrency?: CurrencyCode;
  debitAssetId?: string;
  debitValue: number;
  debitCurrency?: CurrencyCode;
  rate?: number;
  categories?: Array<string>;
  comments?: string;
  operationGroupId?: string;
  constructor() {
    this.id = uuidv4();
    // eslint-disable-next-line prefer-destructuring
    this.timestamp = new Date().toISOString().split('T')[0];
    this.creditValue = 0;
    this.debitValue = 0;
  }
}
