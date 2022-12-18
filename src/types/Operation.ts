import { CurrencySymbol } from './currencies';

export class Operation {
  id: string;
  timestamp: string;
  creditAsset?: string;
  creditValue?: number;
  creditAssetCurrency?: CurrencySymbol;
  debitAsset?: string;
  debitValue?: number;
  debitAssetCurrency?: CurrencySymbol;
  rate?: number;
  categories?: Array<string>;
  comments?: string;
  relatedOperations?: string[];
  constructor({
    id,
    timestamp,
    creditAsset,
    creditValue,
    creditAssetCurrency,
    debitAsset,
    debitValue,
    debitAssetCurrency,
    rate,
    categories,
    comments,
    relatedOperations,
  }: Operation) {
    this.id = id;
    this.timestamp = timestamp;
    this.creditAsset = creditAsset;
    this.creditValue = creditValue;
    this.creditAssetCurrency = creditAssetCurrency || CurrencySymbol.RUR;
    this.debitAsset = debitAsset;
    this.debitValue = debitValue;
    this.debitAssetCurrency = debitAssetCurrency || CurrencySymbol.RUR;
    this.rate = rate;
    this.categories = categories;
    this.comments = comments;
    this.relatedOperations = relatedOperations;
  }
}
