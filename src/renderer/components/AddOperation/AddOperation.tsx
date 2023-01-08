import { FormEvent, useEffect, useState } from 'react';
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
import { IOption } from '../form/types';
import { Operation } from '../../../types/Operation';
import {
  CurrencyCode,
  currencyOptions,
  CurrencySymbol,
} from '../../../types/currencies';
import { Asset } from '../../../types/Asset';
import { requestAssets } from '../../utils/index';
import { makeCurrentDate } from '../../utils/timestamps';
import { useOperationPole } from '../../../utilsGeneral/useOperationPole';
import categories from '../../../types/categories.json';

type SubLine = {
  id: string;
  creditAmount: number;
  debitAmount: number;
  categories: string[];
  isCatError: boolean;
};

type OperationStub = Pick<Operation, 'timestamp' | 'comments' | 'rate'>;

export const AddOperation = () => {
  /* ======================================================================== STATE */
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetOptions, setAssetOptions] = useState<IOption[]>([]);
  // const [assetOptions, setAssetOptions] = useState<IOption[]>([
  //   { value: '', label: 'Выберите счёт' },
  // ]);
  const [operationStub, setOperationStub] = useState<OperationStub>({
    timestamp: makeCurrentDate(),
    comments: '',
    rate: 0,
  });
  const credit = useOperationPole();

  // useEffect(
  //   () => console.log('credit.option.value', credit.option.value),
  //   [credit.option.value]
  // );
  // useEffect(() => console.log('credit.asset', credit.asset), [credit.asset]);

  const debit = useOperationPole();
  const [subLines, setSubLines] = useState<SubLine[]>([
    {
      id: uuidv4(),
      creditAmount: 0,
      debitAmount: 0,
      categories: [],
      isCatError: false,
    },
  ]);
  const [catCombinationSet, setCatCombinationsSet] = useState<Set<string>>(
    new Set()
  );

  /* ======================================================================== METHODS */
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
    const newSubLinesMap = subLines.reduce(
      (results: Map<string, SubLine>, item) => {
        const combination = item.categories.sort().join('_');
        const previous = results.get(combination);
        if (previous) {
          item.id = uuidv4(); // necessary for a proper rerender!
          item.creditAmount += previous.creditAmount;
          item.debitAmount += previous.debitAmount;
        }
        results.set(combination, item);
        return results;
      },
      new Map()
    );
    const newSubLines = Array.from(newSubLinesMap).map((pair) => pair[1]);
    setSubLines(newSubLines);
    return newSubLines;
  }

  function handleRemoveExtraLine(id: string): void {
    setSubLines(subLines.filter((l) => l.id !== id));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newSubLines = groupLines(); // the state may have not been updated yet
    const transactionId = uuidv4();
    const operations = newSubLines.map(
      (line) =>
        new Operation({
          transactionId,
          creditAssetId: credit.asset.id,
          creditCurrencyCode: credit.asset.currency,
          creditOpAmount: line.creditAmount,
          creditTrAmount: credit.total,
          debitAssetId: debit.asset.id,
          debitCurrencyCode: debit.asset.currency,
          debitOpAmount: line.debitAmount,
          debitTrAmount: debit.total,
          categories: line.categories,
          ...operationStub,
        })
    );
    console.log('operations', operations);
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

  /* ======================================================================== EFFECTS */
  useEffect(() => {
    async function downloadAssets() {
      const newAssets = (await requestAssets()) as Asset[];
      setAssets(newAssets);
      setAssetOptions(newAssets.map((i) => ({ value: i.id, label: i.name })));
    }
    downloadAssets();
  }, []);

  useEffect(() => {
    sumSubLines('creditAmount', credit.changeTotal);
    sumSubLines('debitAmount', debit.changeTotal);
    preGroupLines();
  }, [subLines.length]);

  useEffect(() => {
    if (
      credit.total > 0 &&
      debit.total > 0 &&
      credit.asset.currency !== debit.asset.currency
    ) {
      setOperationStub({ ...operationStub, rate: calculateRate() });
    } else {
      setOperationStub({ ...operationStub, rate: 1 });
    }
  }, [credit.total, debit.total]);

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
                  value: credit.asset.currency ?? undefined,
                  label: credit.asset.currency
                    ? CurrencySymbol[credit.asset.currency]
                    : undefined,
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
                  value: debit.asset.currency ?? undefined,
                  label: debit.asset.currency
                    ? CurrencySymbol[debit.asset.currency]
                    : undefined,
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
                {operationStub.rate !== 1 && (
                  <LabeledField label="Курс" id="rate" disabled>
                    <NumericField
                      name="rate"
                      id="rate"
                      defaultValue={operationStub.rate ?? undefined}
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
                disabled: credit.asset.currency === debit.asset.currency,
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
                defaultValue={operationStub.timestamp}
                passValue={(value: string) => {
                  operationStub.timestamp = value;
                }}
              />
            </LabeledField>

            <LabeledField label="Примечания" id="comments">
              <CommentsField
                name="comments"
                id="comments"
                defaultValue={operationStub.comments ?? undefined}
                passValue={(value: string) => {
                  operationStub.comments = value;
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
