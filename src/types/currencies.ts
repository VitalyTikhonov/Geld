import { IOption } from 'renderer/components/form/types';

/* eslint-disable prettier/prettier */
// type CurrencyMap = Map<
//   CurrencyCode,
//   { name: string; symbol: string; code: CurrencyCode }
// >;

export enum CurrencyCode {
  RUR = 'RUR',
  USD = 'USD',
  EUR = 'EUR',
  AMD = 'AMD',
}

export enum CurrencySymbol {
  RUR = '₽',
  USD = '$',
  EUR = '€',
  AMD = 'Դ',
}
// const currencySymbols = Object.values(CurrencySymbol);

// enum CurrencyName {
//   RUR = 'рубль',
//   USD = 'доллар',
//   EUR = 'евро',
//   AMD = 'драм',
// }

export const blankCurrencyOption: IOption<string> = {
  value: '–',
  label: '–',
};

export const currencyOptions: IOption[] = [blankCurrencyOption].concat(
  Object.entries(CurrencySymbol).map((pair) => ({
    value: pair[0],
    label: pair[1],
  }))
);

// export const currencyCodeSet = new Set(Object.values(CurrencyCode));

// const currencyMap: CurrencyMap = new Map([
//   [
//     CurrencyCode.RUR,
//     { name: CurrencyName.RUR, symbol: CurrencySymbol.RUR, code: CurrencyCode.RUR },
//   ],
//   [
//     CurrencyCode.USD,
//     { name: CurrencyName.USD, symbol: CurrencySymbol.USD, code: CurrencyCode.USD },
//   ],
//   [
//     CurrencyCode.EUR,
//     { name: CurrencyName.EUR, symbol: CurrencySymbol.EUR, code: CurrencyCode.EUR },
//   ],
//   [
//     CurrencyCode.AMD,
//     { name: CurrencyName.AMD, symbol: CurrencySymbol.AMD, code: CurrencyCode.AMD },
//   ],
// ]);
