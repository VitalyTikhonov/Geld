export class Operation {
  timestamp: string;
  creditAsset?: string;
  creditValue?: number;
  debitAsset?: string;
  debitValue?: number;
  rate?: number;
  categories?: Array<string>;
  comments?: string;
  constructor({
    timestamp,
    creditAsset,
    creditValue,
    debitAsset,
    debitValue,
    rate,
    categories,
    comments,
  }: Operation) {
    this.timestamp = timestamp;
    this.creditAsset = creditAsset;
    this.creditValue = creditValue;
    this.debitAsset = debitAsset;
    this.debitValue = debitValue;
    this.rate = rate;
    this.categories = categories;
    this.comments = comments;
  }
}
