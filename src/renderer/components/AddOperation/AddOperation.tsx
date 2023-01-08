import { FormEvent, useEffect, useState, useMemo, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  AddLineButton,
  CommentsField,
  ConsolidateLinesButton,
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
import categories from '../../../configs/categories.json';

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
  // useEffect(() => console.log('credit.total', credit.total), [credit.total]);
  // useEffect(() => console.log('debit.total', debit.total), [debit.total]);
  useEffect(() => {
    operation.creditAssetId = credit.asset.id;
    operation.creditCurrencyCode = credit.asset.currency;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credit]);
  useEffect(() => {
    operation.debitAssetId = debit.asset.id;
    operation.debitCurrencyCode = debit.asset.currency;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debit]);

  type SubLine = {
    id: string;
    creditAmount: number;
    debitAmount: number;
    categories: string[];
    isCatError: boolean;
  };
  const [subLines, setSubLines] = useState<SubLine[]>([
    {
      id: uuidv4(),
      creditAmount: 0,
      debitAmount: 0,
      categories: [],
      isCatError: false,
    },
  ]);

  function sumSubLines(
    property: 'creditAmount' | 'debitAmount',
    updater: (n: number) => void
  ): void {
    let result = 0;
    subLines.forEach((line) => {
      result += line[property];
    });
    updater(result);
  }

  function calculateRate(): number {
    const larger = Math.max(credit.total, debit.total);
    const smaller = Math.min(credit.total, debit.total);
    return Number((larger / smaller).toFixed(2));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // console.log('handleSubmit event', event);
    // console.log(
    //   'handleSubmit Object.entries(event.target)',
    //   Object.entries(event.target)
    // );
    console.log('handleSubmit subLines', subLines);
    console.log(
      'handleSubmit operation.creditOpAmount',
      operation.creditOpAmount
    );
    console.log(
      'handleSubmit operation.debitOpAmount',
      operation.debitOpAmount
    );
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

  const [catCombinationSet, setCatCombinationsSet] = useState<Set<string>>(
    new Set()
  );

  function preGroupLines() {
    const newCatCombinationSet = new Set<string>();
    if (subLines.length !== 1) {
      subLines.forEach((line) => {
        if (line.categories.length === 0) {
          line.isCatError = true;
          newCatCombinationSet.clear();
        } else {
          line.isCatError = false;
          newCatCombinationSet.add(line.categories.sort().join('_'));
        }
      });
    } else {
      subLines[0].isCatError = false;
      newCatCombinationSet.clear();
    }
    if (newCatCombinationSet.size === subLines.length) {
      newCatCombinationSet.clear();
    }
    setCatCombinationsSet(new Set(newCatCombinationSet));
  }

  function groupLines() {
    // const newSubLines = [];
    // Array.from(catCombinationSet).forEach((c) => {
    //   newSubLines.push({ /* iterate over subLines for conditional sum */ })
    // });
    const newSubLines = subLines.reduce(
      (results: Map<string, SubLine>, item) => {
        const combination = item.categories.sort().join('_');
        const previous = results.get(combination);
        if (previous) {
          item.id = uuidv4();
          item.creditAmount += previous.creditAmount;
          item.debitAmount += previous.debitAmount;
        }
        results.set(combination, item);
        return results;
      },
      new Map()
    );
    setSubLines(Array.from(newSubLines).map((pair) => pair[1]));
  }

  useEffect(() => {
    sumSubLines('creditAmount', credit.changeTotal);
    sumSubLines('debitAmount', debit.changeTotal);
    preGroupLines();
    console.log('subLines', subLines);
  }, [subLines.length]);

  // useEffect(() => {
  //   console.log('catCombinationSet', catCombinationSet);
  //   console.log('subLines', subLines);
  //   console.log(catCombinationSet.size !== subLines.length);
  //   console.log(!subLines.some((line) => line.isCatError));
  // }, [catCombinationSet]);

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
                {credit.total > 0 &&
                  debit.total > 0 &&
                  credit.asset.currency !== debit.asset.currency && (
                    <LabeledField label="Курс" id="rate" disabled>
                      <NumericField
                        name="rate"
                        id="rate"
                        defaultValue={calculateRate()}
                        width="narrow"
                        passValue={() => undefined}
                        disabled
                      />
                    </LabeledField>
                  )}
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
                      isCatError: false,
                    },
                  ])
                }
              />
            </>
          </OpLine>

          {/* SUBLINES */}
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
                  sumSubLines('creditAmount', credit.changeTotal);
                },
              }}
              debit={{
                defaultValue: line.debitAmount,
                passValue: (newValue) => {
                  line.debitAmount = newValue;
                  sumSubLines('debitAmount', debit.changeTotal);
                },
              }}
              categories={{
                options: categories,
                defaultValue: line.categories,
                passValue: (newCategories) => {
                  line.categories = newCategories;
                  preGroupLines();
                },
              }}
              isCatError={line.isCatError}
            />
          ))}

          {/* SUBLINES TOTALS */}
          {subLines.length > 1 && (
            <OpLine key={uuidv4()} id={uuidv4()}>
              <LabeledField label="Итого" id="sublinesTotal" disabled>
                <NumericField
                  name="creditSubLinesTotal"
                  id="creditSubLinesTotal"
                  defaultValue={credit.total}
                  passValue={() => undefined}
                  disabled
                />
              </LabeledField>

              <LabeledField label="Итого" id="sublinesTotal" disabled>
                <NumericField
                  name="debitSubLinesTotal"
                  id="debitSubLinesTotal"
                  defaultValue={debit.total}
                  passValue={() => undefined}
                  disabled
                />
              </LabeledField>

              {catCombinationSet.size ? (
                <>
                  <div className="display_row" />
                  <ConsolidateLinesButton onClick={groupLines} />
                </>
              ) : (
                <></>
              )}
            </OpLine>
          )}

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
