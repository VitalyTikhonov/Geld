import { MouseEvent, useEffect } from 'react';
import { LabeledField, NumericField, RemoveLineButton } from '../form';
import Categories from './Categories';
import OpLine from './OpLine';

interface IOpSubline {
  id: string;
  // eslint-disable-next-line react/require-default-props
  handleRemoveExtraLine?: (id: string) => void;
  isSingle: boolean;
}

export default function OpSubline({
  id,
  handleRemoveExtraLine,
  isSingle,
}: IOpSubline): JSX.Element {
  // useEffect(() => {
  //   console.clear();
  //   console.log(isSingle);
  // }, [isSingle]);

  if (handleRemoveExtraLine) {
    return (
      <OpLine id={id}>
        <NumericField
          id="credit-amount"
          value={7445000.0}
          onChange={() => undefined}
        />

        <NumericField
          id="debit-amount"
          value={7445000.0}
          onChange={() => undefined}
        />

        <>
          <Categories />
          <RemoveLineButton
            id={id}
            onClick={handleRemoveExtraLine}
            disabled={isSingle}
          />
        </>
      </OpLine>
    );
  }
  return (
    <OpLine id={id}>
      <LabeledField label="Сумма списания" id="credit-amount">
        <NumericField
          id="credit-amount"
          value={7445000.0}
          onChange={() => undefined}
        />
      </LabeledField>

      <LabeledField label="Сумма зачисления" id="debit-amount">
        <NumericField
          id="debit-amount"
          value={7445000.0}
          onChange={() => undefined}
        />
      </LabeledField>

      <LabeledField label="Категории" id="credit-amount">
        <Categories />
      </LabeledField>
    </OpLine>
  );
}
