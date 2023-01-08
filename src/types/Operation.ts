import { v4 as uuidv4 } from 'uuid';
import { CurrencyCode } from './currencies';

export class Operation {
  id: string;
  transactionId: string;
  timestamp: string;
  creditAssetId: string | null;
  creditCurrencyCode: CurrencyCode | null;
  creditOpAmount: number | null;
  creditTrAmount: number | null;
  debitAssetId: string | null;
  debitCurrencyCode: CurrencyCode | null;
  debitOpAmount: number | null;
  debitTrAmount: number | null;
  rate: number | null;
  categories: Array<string> | null;
  comments: string | null;

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
    this.creditAssetId = creditAssetId || null;
    this.creditCurrencyCode = creditCurrencyCode || null;
    this.creditOpAmount = creditOpAmount || null;
    this.creditTrAmount = creditTrAmount || null;
    this.debitAssetId = debitAssetId || null;
    this.debitCurrencyCode = debitCurrencyCode || null;
    this.debitOpAmount = debitOpAmount || null;
    this.debitTrAmount = debitTrAmount || null;
    this.rate = rate || null;
    this.categories = categories || null;
    this.comments = comments || null;
  }
}
