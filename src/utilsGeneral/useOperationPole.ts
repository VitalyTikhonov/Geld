import { useState } from 'react';
import { IOption } from 'renderer/components/form/types';
import {
  blankCurrencyOption,
  CurrencyCode,
  CurrencySymbol,
} from 'types/currencies';
import { Asset } from '../types/Asset';

type AssetInfo = Partial<Asset>;

const getBlankAsset = (props: AssetInfo): AssetInfo => ({
  name: undefined,
  currency: undefined,
  balance: undefined,
  openDate: undefined,
  ...props,
});

export const blankAssetOption: IOption<string> = {
  value: '–',
  label: 'Выберите счёт',
};

export function useOperationPole() {
  const [asset, setAsset] = useState<AssetInfo>(getBlankAsset({}));
  const [assetOption, setAssetOption] = useState<IOption>(blankAssetOption);
  const [currencyOption, setCurrencyOption] =
    useState<IOption>(blankCurrencyOption);
  const [total, setTotal] = useState(0);

  function replace(newAsset: Asset | undefined) {
    if (newAsset) {
      setAsset(newAsset);
      setAssetOption({ value: newAsset.id, label: newAsset.name });
      setCurrencyOption({
        value: newAsset.currency,
        label: CurrencySymbol[newAsset.currency],
      });
    } else {
      setAsset(getBlankAsset({}));
      setAssetOption(blankAssetOption);
      setCurrencyOption(blankCurrencyOption);
    }
  }

  function changeCurrency(code: CurrencyCode) {
    setAsset(getBlankAsset({ currency: code }));
    setAssetOption(blankAssetOption);
    setCurrencyOption({
      value: code,
      label: CurrencySymbol[code],
    });
  }

  function changeTotal(amount: number) {
    setTotal(amount);
  }

  return {
    asset,
    assetOption,
    currencyOption,
    total,
    replace,
    changeCurrency,
    changeTotal,
  };
}
