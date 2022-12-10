import { FormEvent, ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectNewOperation, setNewOperation } from 'store/operationsSlice';
import {
  AddLineButton,
  CommentsField,
  Dropdown,
  FieldLabel,
  LabeledFiled,
  NumericField,
  SubmitButton,
} from '../form';
import './AddOperation.scss';
import OpLine from './OpLine';

export const AddOperation = () => {
  const newOperation = useAppSelector(selectNewOperation);
  /* The form field names must match the properties of the Operation */
  const dispatch = useAppDispatch();
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
          <OpLine
            columnLeft={
              <>
                <LabeledFiled label="Списание" id="credit">
                  <Dropdown
                    id="credit"
                    optionLabels={['Namba wan', 'Namba tu', 'Namba sri']}
                  />
                </LabeledFiled>

                <Dropdown
                  id="credit-currency"
                  optionLabels={['₽', '$', '€', 'Դ']}
                />
              </>
            }
            columnMiddle={
              <>
                <LabeledFiled label="Зачисление" id="debit">
                  <Dropdown
                    id="debit"
                    optionLabels={['Namba wan', 'Namba tu', 'Namba sri']}
                  />
                </LabeledFiled>

                <Dropdown
                  id="debit-currency"
                  optionLabels={['₽', '$', '€', 'Դ']}
                />
              </>
            }
            columnRight={
              <>
                <LabeledFiled label="Курс" id="rate">
                  <NumericField id="rate" value={25587485.0} />
                </LabeledFiled>
              </>
            }
          />
        </form>
      </div>

      <div className="add_operation framed_section">
        <h1 className="add_operation--headline framed_section--headline">
          Добавить операцию
        </h1>

        <form
          className="add_operation--form"
          name="addOperationForm"
          onSubmit={handleSubmit}
        >
          <div className="add_operation">
            <Dropdown
              id="1"
              optionLabels={['Namba wan', 'Namba tu', 'Namba sri']}
            />
            <FieldLabel htmlFor="drf" label="Yarlyk" />
            <FieldLabel htmlFor="drf" label="Yarlyk" disabled />
            <NumericField id="drf" value={25587485.0} />
            <NumericField id="drf" disabled value={25587485.0} />
            <AddLineButton onClick={() => undefined} />
            <SubmitButton onClick={() => undefined} />
            <CommentsField
              id="sdfadf"
              value="Лишь сделанные на базе интернет-аналитики выводы описаны максимально подробно..."
            />
          </div>
        </form>
      </div>
    </>
  );
};
