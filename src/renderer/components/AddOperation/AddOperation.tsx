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
  const [extraSubLines, setExtraSubLines] = useState<string[]>([uuidv4()]);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // console.log('OPERATION', newOperation);
    event.preventDefault();
    /* Pass from Redux to DB */
    try {
      // const operation = new Operation();
      await window.electron.saveOp(operation);
      // console.log('operationCreated', operationCreated);
      /* Get all operations from DB and write them to Redux */
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  }

  function handleRemoveExtraLine(id: string): void {
    setExtraSubLines(extraSubLines.filter((l) => l !== id));
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
                  value={{
                    value: credit.option.value,
                    label: credit.option.label,
                  }}
                  placeholder="Выберите счёт"
                  onChange={(e: GeChangeEvent) =>
                    credit.replace(assets.find((a) => a.id === e.target.value))
                  }
                />
              </LabeledField>

              <Dropdown
                name="creditAssetCurrency"
                id="creditAssetCurrency"
                options={currencyOptions}
                value={{
                  value: credit.asset.currency,
                  label: CurrencySymbol[credit.asset.currency],
                }}
                onChange={(e: GeChangeEvent) =>
                  credit.changeCurrency(e.target.value as CurrencyCode)
                }
              />
            </>
            <>
              <LabeledField label="Зачисление" id="debitAssetId">
                <Dropdown
                  name="debitAssetId"
                  id="debitAssetId"
                  options={assetOptions}
                  value={{
                    value: debit.option.value,
                    label: debit.option.label,
                  }}
                  placeholder="Выберите счёт"
                  onChange={(e: GeChangeEvent) =>
                    debit.replace(assets.find((a) => a.id === e.target.value))
                  }
                />
              </LabeledField>

              <Dropdown
                name="debitAssetCurrency"
                id="debitAssetCurrency"
                options={currencyOptions}
                value={{
                  value: debit.asset.currency,
                  label: CurrencySymbol[debit.asset.currency],
                }}
                onChange={(e: GeChangeEvent) =>
                  debit.changeCurrency(e.target.value as CurrencyCode)
                }
              />
            </>
            <>
              <div className="display_row">
                <LabeledField label="Курс" id="rate">
                  <NumericField
                    name="rate"
                    id="rate"
                    value={85.0}
                    width="narrow"
                    onChange={() => undefined}
                  />
                </LabeledField>

                <LabeledField label="Итого" id="sublinesTotal">
                  <NumericField
                    name="sublinesTotal"
                    id="sublinesTotal"
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
              <DateField
                name="timestamp"
                id="timestamp"
                defaultValue={operation.timestamp}
                mutateUpperScopeValue={(value: string) => {
                  operation.timestamp = value;
                }}
              />
            </LabeledField>

            <LabeledField label="Примечания" id="comments">
              <CommentsField
                name="comments"
                id="comments"
                defaultValue={operation.comments}
                mutateUpperScopeValue={(value: string) => {
                  operation.comments = value;
                }}
              />
            </LabeledField>

            <SubmitButton onClick={() => undefined} />
          </OpLine>
        </form>
      </div>
    </>
  );
};
