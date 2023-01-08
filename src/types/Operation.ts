import { v4 as uuidv4 } from 'uuid';
import { CurrencyCode } from './currencies';

export class Operation {
  id: string;
  transactionId: string;
  timestamp: string;
  creditAssetId: string;
  creditCurrencyCode: CurrencyCode;
  creditOpAmount: number;
  creditTrAmount: number;
  debitAssetId: string;
  debitCurrencyCode: CurrencyCode;
  debitOpAmount: number;
  debitTrAmount: number;
  rate: number;
  categories: Array<string>;
  comments: string;

  constructor({
    transactionId,
    timestamp,
    creditAssetId,
    creditCurrencyCode,
    creditOpAmount,
    creditTrAmount,
    debitAssetId,
    debitCurrencyCode,
    debitOpAmount,
    debitTrAmount,
    rate,
    categories,
    comments,
  }: Omit<Operation, 'id'>) {
    this.id = uuidv4();
    this.transactionId = transactionId;
    this.timestamp = timestamp;
    this.creditAssetId = creditAssetId;
    this.creditCurrencyCode = creditCurrencyCode;
    this.creditOpAmount = creditOpAmount;
    this.creditTrAmount = creditTrAmount;
    this.debitAssetId = debitAssetId;
    this.debitCurrencyCode = debitCurrencyCode;
    this.debitOpAmount = debitOpAmount;
    this.debitTrAmount = debitTrAmount;
    this.rate = rate;
    this.categories = categories;
    this.comments = comments;
  }
}
