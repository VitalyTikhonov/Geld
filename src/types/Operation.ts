import { Asset } from './Asset';
import { CurrencySymbol } from './currencies';

export class Operation {
  availableAssets: Asset[];
  id: string;
  timestamp: string;
  creditAsset?: string;
  // private _creditAsset?: string;
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
    availableAssets,
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
    this.availableAssets = availableAssets;
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

  // set creditAsset(id: string) {
  //   this._creditAsset = id;
  // }
}
