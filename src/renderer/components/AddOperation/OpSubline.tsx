import { NumericField, RemoveLineButton } from '../form';
import Categories from './Categories';
import OpLine from './OpLine';

interface IOpSubline {
  id: string;
  credit: {
    defaultValue: number;
    passValue: (arg: number) => void;
  };
  debit: {
    defaultValue: number;
    passValue: (arg: number) => void;
  };
  categories: {
    defaultValue: string[];
    passValue: (args: string[]) => void;
  };
  handleRemoveExtraLine: (id: string) => void;
  isSingle: boolean;
}

export default function OpSubline({
  id,
  handleRemoveExtraLine,
  isSingle,
  credit,
  debit,
  categories,
}: IOpSubline): JSX.Element {
  return (
    <OpLine id={id}>
      <NumericField
        id={`credit-amount-${id}`}
        name={`credit-amount-${id}`}
        defaultValue={credit.defaultValue}
        passValue={credit.passValue}
        placeholder="Сумма"
      />

      <NumericField
        id={`debit-amount-${id}`}
        name={`debit-amount-${id}`}
        defaultValue={debit.defaultValue}
        passValue={debit.passValue}
        placeholder="Сумма"
      />

      <>
        <Categories
          id={`categories-${id}`}
          defaultValue={categories.defaultValue}
          passValue={categories.passValue}
        />
        <RemoveLineButton
          id={id} // Не изменять id
          onClick={handleRemoveExtraLine}
          disabled={isSingle}
        />
      </>
    </OpLine>
  );
}
