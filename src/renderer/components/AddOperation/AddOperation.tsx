import { FormEvent, ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectNewOperation, setNewOperation } from 'store/operationsSlice';
import {
  AddLineButton,
  CommentsField,
  DateField,
  Dropdown,
  LabeledField,
  NumericField,
  SubmitButton,
} from '../form';
import './AddOperation.scss';
import OpLine from './OpLine';
import OpSubline from './OpSubline';

export const AddOperation = () => {
  const newOperation = useAppSelector(selectNewOperation);
  /* The form field names must match the properties of the Operation */
  const dispatch = useAppDispatch();

  const [extraSubLines, setExtraSubLines] = useState<string[]>([uuidv4()]);

  // useEffect(() => console.log('newOperation', newOperation), [newOperation]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    /* Save to Redux */
    const { name, value } = event.target;
    dispatch(setNewOperation({ ...newOperation, [name]: value }));
    // console.log('{ name, value }', { name, value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // console.log('OPERATION', newOperation);
    event.preventDefault();
    /* Pass from Redux to DB */
    try {
      const operationCreated = await window.electron.saveOp(newOperation);
      console.log('operationCreated', operationCreated);
      /* Get all operations from DB and write them to Redux */
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  }

  function handleRemoveExtraLine(id: string): void {
    // if (extraSubLines.length > 1) {
    setExtraSubLines(extraSubLines.filter((l) => l !== id));
    // }
  }

  return (
    <>
      <div className="add_operation framed_section">
        <h1 className="add_operation--headline framed_section--headline">
          Добавить операцию
        </h1>

        <form
          className="add_operation--form"
          name="addOperationForm"
          onSubmit={handleSubmit}
        >
          <OpLine key={uuidv4()} id={uuidv4()}>
            <>
              <LabeledField label="Списание" id="credit">
                <Dropdown
                  id="credit"
                  optionLabels={['Namba wan', 'Namba tu', 'Namba sri']}
                  onChange={() => undefined}
                />
              </LabeledField>

              <Dropdown
                id="credit-currency"
                optionLabels={['₽', '$', '€', 'Դ']}
                onChange={() => undefined}
              />
            </>
            <>
              <LabeledField label="Зачисление" id="debit">
                <Dropdown
                  id="debit"
                  optionLabels={['Namba wan', 'Namba tu', 'Namba sri']}
                  onChange={() => undefined}
                />
              </LabeledField>

              <Dropdown
                id="debit-currency"
                optionLabels={['₽', '$', '€', 'Դ']}
                onChange={() => undefined}
              />
            </>
            <>
              <div className="display_row">
                <LabeledField label="Курс" id="rate">
                  <NumericField
                    id="rate"
                    value={85.0}
                    width="narrow"
                    onChange={() => undefined}
                  />
                </LabeledField>

                <LabeledField label="Итого" id="sublines_total">
                  <NumericField
                    id="sublines_total"
                    value={2456425.0}
                    onChange={() => undefined}
                  />
                </LabeledField>
              </div>

              <AddLineButton
                onClick={() => setExtraSubLines([...extraSubLines, uuidv4()])}
              />
            </>
          </OpLine>

          {extraSubLines.map((sl) => (
            <OpSubline
              key={sl}
              id={sl}
              handleRemoveExtraLine={handleRemoveExtraLine}
              isSingle={extraSubLines.length === 1}
            />
          ))}

          <OpLine key={uuidv4()} id={uuidv4()} freeWidth>
            <LabeledField label="Дата" id="date">
              <DateField id="date" onChange={() => undefined} />
            </LabeledField>

            <LabeledField label="Примечания" id="comments">
              <CommentsField
                id="comments"
                value="Лишь сделанные на базе интернет-аналитики выводы описаны максимально подробно..."
                onChange={() => undefined}
              />
            </LabeledField>

            <SubmitButton onClick={() => undefined} />
          </OpLine>
        </form>
      </div>
    </>
  );
};
