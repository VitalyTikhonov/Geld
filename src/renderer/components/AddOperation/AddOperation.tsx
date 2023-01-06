import { FormEvent, useEffect, useState, useMemo, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import { GeChangeEvent, GeChangeHandler, IOption } from '../form/types';
import { Operation } from '../../../types/Operation';
import {
  CurrencyCode,
  currencyOptions,
  CurrencySymbol,
} from '../../../types/currencies';
import { Asset } from '../../../types/Asset';
import { requestAssets } from '../../utils';
import { useOperationPole } from '../../../utilsGeneral/useOperationPole';

export const AddOperation = () => {
  const [operation, setOperation] = useState(new Operation());
  useEffect(() => console.log('operation', operation), [operation]);

  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetOptions, setAssetOptions] = useState<IOption[]>([
    { value: '', label: 'Выберите счёт' },
  ]);
  useEffect(() => {
    async function downloadAssets() {
      const newAssets = (await requestAssets()) as Asset[];
      setAssets(newAssets);
      setAssetOptions((state) =>
        state.concat(newAssets.map((i) => ({ value: i.id, label: i.name })))
      );
    }
    downloadAssets();
  }, []);

  const credit = useOperationPole();
  const debit = useOperationPole();
  useEffect(() => {
    operation.creditAssetId = credit.asset.id;
    operation.creditCurrency = credit.asset.currency;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credit]);
  useEffect(() => {
    operation.debitAssetId = debit.asset.id;
    operation.debitCurrency = debit.asset.currency;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debit]);

  type SubLine = {
    id: string;
    creditAmount: number;
    debitAmount: number;
    categories: string[];
  };
  const [subLines, setSubLines] = useState<SubLine[]>([
    {
      id: uuidv4(),
      creditAmount: 0,
      debitAmount: 0,
      categories: [],
    },
  ]);
  useEffect(() => console.log('subLines', subLines), [subLines]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log('handleSubmit event', event);
    console.log(
      'handleSubmit Object.entries(event.target)',
      Object.entries(event.target)
    );
    console.log('handleSubmit operation', operation);
    event.preventDefault();
    /* Pass from Redux to DB */
    // try {
    //   // const operation = new Operation();
    //   await window.electron.saveOp(operation);
    //   // console.log('operationCreated', operationCreated);
    //   /* Get all operations from DB and write them to Redux */
    // } catch (error) {
    //   // eslint-disable-next-line no-console
    //   console.log('error', error);
    // }
  }

  function handleRemoveExtraLine(id: string): void {
    setSubLines(subLines.filter((l) => l.id !== id));
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
              <LabeledField label="Списание" id="creditAssetId">
                <Dropdown
                  name="creditAssetId"
                  id="creditAssetId"
                  options={assetOptions}
                  defaultValue={{
                    value: credit.option.value,
                    label: credit.option.label,
                  }}
                  placeholder="Выберите счёт"
                  passValue={(newValue) =>
                    credit.replace(
                      assets.find(
                        (a) => a.id === (newValue as IOption<string>).value
                      )
                    )
                  }
                />
              </LabeledField>

              <Dropdown
                name="creditCurrency"
                id="creditCurrency"
                options={currencyOptions}
                defaultValue={{
                  value: credit.asset.currency,
                  label: CurrencySymbol[credit.asset.currency],
                }}
                passValue={(newValue) =>
                  credit.changeCurrency(
                    (newValue as IOption<string>).value as CurrencyCode
                  )
                }
              />
            </>
            <>
              <LabeledField label="Зачисление" id="debitAssetId">
                <Dropdown
                  name="debitAssetId"
                  id="debitAssetId"
                  options={assetOptions}
                  defaultValue={{
                    value: debit.option.value,
                    label: debit.option.label,
                  }}
                  placeholder="Выберите счёт"
                  passValue={(newValue) =>
                    debit.replace(
                      assets.find(
                        (a) => a.id === (newValue as IOption<string>).value
                      )
                    )
                  }
                />
              </LabeledField>

              <Dropdown
                name="debitCurrency"
                id="debitCurrency"
                options={currencyOptions}
                defaultValue={{
                  value: debit.asset.currency,
                  label: CurrencySymbol[debit.asset.currency],
                }}
                passValue={(newValue) =>
                  debit.changeCurrency(
                    (newValue as IOption<string>).value as CurrencyCode
                  )
                }
              />
            </>
            <>
              <div className="display_row">
                {/* <LabeledField label="Курс" id="rate">
                  <NumericField
                    name="rate"
                    id="rate"
                    defaultValue={85.0}
                    width="narrow"
                    passValue={() => undefined}
                  />
                </LabeledField>

                <LabeledField label="Итого" id="sublinesTotal">
                  <NumericField
                    name="sublinesTotal"
                    id="sublinesTotal"
                    defaultValue={2456425.0}
                    passValue={() => undefined}
                  />
                </LabeledField> */}
              </div>

              <AddLineButton
                onClick={() =>
                  setSubLines([
                    ...subLines,
                    {
                      id: uuidv4(),
                      creditAmount: 0,
                      debitAmount: 0,
                      categories: [],
                    },
                  ])
                }
              />
            </>
          </OpLine>

          {subLines.map((line) => (
            <OpSubline
              key={line.id}
              id={line.id}
              handleRemoveExtraLine={handleRemoveExtraLine}
              isSingle={subLines.length === 1}
              credit={{
                defaultValue: line.creditAmount,
                passValue: (newValue) => {
                  line.creditAmount = newValue;
                  credit.changeTotal(credit.total + newValue);
                  operation.creditValue += newValue;
                },
              }}
              debit={{
                defaultValue: line.debitAmount,
                passValue: (newValue) => {
                  line.debitAmount = newValue;
                  debit.changeTotal(debit.total + newValue);
                  operation.debitValue += newValue;
                },
              }}
              categories={{
                defaultValue: line.categories,
                passValue: (newCategories) => {
                  line.categories = newCategories;
                },
              }}
            />
          ))}

          <OpLine key={uuidv4()} id={uuidv4()} freeWidth>
            <LabeledField label="Дата" id="date">
              <DateField
                name="timestamp"
                id="timestamp"
                defaultValue={operation.timestamp}
                passValue={(value: string) => {
                  operation.timestamp = value;
                }}
              />
            </LabeledField>

            <LabeledField label="Примечания" id="comments">
              <CommentsField
                name="comments"
                id="comments"
                defaultValue={operation.comments || ''}
                passValue={(value: string) => {
                  operation.comments = value;
                }}
              />
            </LabeledField>

            <SubmitButton />
          </OpLine>
        </form>
      </div>
    </>
  );
};
