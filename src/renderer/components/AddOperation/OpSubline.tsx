import { LabeledFiled, NumericField } from '../form';
import Categories from './Categories';
import OpLine from './OpLine';

export default function OpSubline(): JSX.Element {
  return (
    <OpLine>
      <LabeledFiled label="Сумма списания" id="credit-amount">
        <NumericField id="credit-amount" value={7445000.0} />
      </LabeledFiled>

      <LabeledFiled label="Сумма зачисления" id="debit-amount">
        <NumericField id="debit-amount" value={7445000.0} />
      </LabeledFiled>

      <Categories />
    </OpLine>
  );
}
