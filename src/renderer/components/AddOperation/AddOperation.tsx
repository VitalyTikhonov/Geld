import { FormEvent, useEffect, useState, useMemo } from 'react';
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
import { GeChangeHandler, IOption } from '../form/types';
import { Operation } from '../../../types/Operation';
import { currencySymbols } from '../../../types/currencies';
import { Asset } from '../../../types/Asset';
import { requestAssets } from '../../utils';

export const AddOperation = () => {
  const [extraSubLines, setExtraSubLines] = useState<string[]>([uuidv4()]);

  /* The form field names must match the properties of the Operation */
  const [newOperation, setNewOperation] = useState(
    new Operation({
      id: uuidv4(),
      timestamp: new Date().toISOString().split('T')[0],
      availableAssets: [],
    })
  );
  useEffect(() => console.log('newOperation', newOperation), [newOperation]);

  const [assets, setAssets] = useState<Asset[]>([]);
  useEffect(() => {
    requestAssets(setAssets);
  }, []);
  useEffect(() => {
    newOperation.availableAssets = assets;
  }, [assets, newOperation]);

  const assetOptions: IOption[] = useMemo(
    () => assets.map((a) => ({ value: a.id, label: a.name })),
    [assets]
  );

  const handleChange: GeChangeHandler = ({ target }) => {
    setNewOperation({ ...newOperation, [target.name]: target.value });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // console.log('OPERATION', newOperation);
    event.preventDefault();
    /* Pass from Redux to DB */
    try {
      const operationCreated = await window.electron.saveOp(newOperation);
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
              <LabeledField label="Списание" id="creditAsset">
                <Dropdown
                  name="creditAsset"
                  id="creditAsset"
                  options={assetOptions}
                  value={{
                    value: newOperation.creditAsset,
                    label: assets.find((a) => a.id === newOperation.creditAsset)
                      ?.name,
                  }}
                  placeholder="Выберите счёт"
                  onChange={handleChange}
                />
              </LabeledField>

              <Dropdown
                name="creditAssetCurrency"
                id="creditAssetCurrency"
                options={currencySymbols}
                value={newOperation.creditAssetCurrency || ''}
                onChange={handleChange}
              />
            </>
            <>
              <LabeledField label="Зачисление" id="debitAsset">
                <Dropdown
                  name="debitAsset"
                  id="debitAsset"
                  options={assetOptions}
                  value={{
                    value: newOperation.debitAsset,
                    label: assets.find((a) => a.id === newOperation.debitAsset)
                      ?.name,
                  }}
                  placeholder="Выберите счёт"
                  onChange={handleChange}
                />
              </LabeledField>

              <Dropdown
                name="debitAssetCurrency"
                id="debitAssetCurrency"
                options={currencySymbols}
                value={newOperation.debitAssetCurrency || ''}
                onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </LabeledField>

                <LabeledField label="Итого" id="sublinesTotal">
                  <NumericField
                    name="sublinesTotal"
                    id="sublinesTotal"
                    value={2456425.0}
                    onChange={handleChange}
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
                value={newOperation.timestamp || ''}
                onChange={handleChange}
              />
            </LabeledField>

            <LabeledField label="Примечания" id="comments">
              <CommentsField
                name="comments"
                id="comments"
                value="Лишь сделанные на базе интернет-аналитики выводы описаны максимально подробно..."
                onChange={handleChange}
              />
            </LabeledField>

            <SubmitButton onClick={() => undefined} />
          </OpLine>
        </form>
      </div>
    </>
  );
};
