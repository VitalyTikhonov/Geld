import { useState } from 'react';
import { IOption } from 'renderer/components/form/types';
import { CurrencyCode } from 'types/currencies';
import { Asset, BlankAsset } from '../types/Asset';

const blankAsset: BlankAsset = {
  name: null,
  id: null,
  currency: null,
};

const blankOption = {
  value: undefined,
  label: undefined,
};

export function useOperationPole() {
  const [asset, setAsset] = useState<Asset | BlankAsset>(blankAsset);
  const [total, setTotal] = useState(0);
  const [option, setOption] = useState<IOption>(blankOption);

  function replace(newAsset: Asset | undefined) {
    if (newAsset) {
      setAsset(newAsset);
      setOption({ value: newAsset.id, label: newAsset.name });
    } else {
      setAsset(blankAsset);
      setOption(blankOption);
    }
  }

  function changeCurrency(code: CurrencyCode) {
    asset.currency = code;
    setAsset({ ...asset });
    setOption(blankOption);
  }

  function changeTotal(amount: number) {
    setTotal(amount);
  }

  return {
    asset,
    total,
    option,
    replace,
    changeCurrency,
    changeTotal,
  };
}
