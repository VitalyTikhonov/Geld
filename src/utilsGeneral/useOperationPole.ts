import { useState } from 'react';
import { IOption } from 'renderer/components/form/types';
import { CurrencyCode } from 'types/currencies';
import { Asset } from '../types/Asset';

const blankOption = {
  value: '',
  label: '',
};

export function useOperationPole() {
  const [asset, setAsset] = useState<Asset>(new Asset());
  const [total, setTotal] = useState(0);
  const [option, setOption] = useState<IOption>(blankOption);

  function replace(newAsset: Asset | undefined) {
    if (newAsset) {
      setAsset(newAsset);
      setOption({ value: newAsset.id, label: newAsset.name });
    } else {
      setAsset(new Asset());
      setOption(blankOption);
    }
  }

  function changeCurrency(code: CurrencyCode) {
    const newAsset = new Asset();
    newAsset.currency = code;
    setAsset(newAsset);
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
