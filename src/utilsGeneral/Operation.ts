export class Operation {
  date: string;
  rate?: number;
  credit?: string;
  creditSum?: number;
  debit?: string;
  debitSum?: number;
  notes?: string;
  categories?: Array<string>;
  constructor({
    date,
    rate,
    credit,
    creditSum,
    debit,
    debitSum,
    notes,
    categories,
  }: Operation) {
    this.date = date;
    this.rate = rate;
    this.credit = credit;
    this.creditSum = creditSum;
    this.debit = debit;
    this.debitSum = debitSum;
    this.notes = notes;
    this.categories = categories;
  }
}
