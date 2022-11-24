import { FormEvent, ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectNewOperation, setNewOperation } from 'store/operationsSlice';
import './AddOperation.css';

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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
    /* Get all operations from DB and write them to Redux */
  }

  return (
    <div className="add_operation framed_section">
      <h1 className="add_operation--headline framed_section--headline">
        Добавить операцию
      </h1>

      <form
        className="add_operation--form"
        name="addOperationForm"
        onSubmit={handleSubmit}
      >
        <div className="add_operation--col">
          <div className="add_operation--basic_fields">
            <div className="add_operation--bfieldscol">
              <label className="add_operation--label" htmlFor="timestamp">
                Дата
                <input
                  className="add_operation--input"
                  type="timestamp"
                  name="timestamp"
                  value={newOperation.timestamp || ''}
                  onChange={handleChange}
                  id="timestamp"
                />
              </label>

              <label className="add_operation--label" htmlFor="rate">
                Курс
                <input
                  className="add_operation--input"
                  type="number"
                  name="rate"
                  value={newOperation.rate || ''}
                  onChange={handleChange}
                  id="rate"
                />
              </label>
            </div>

            <div className="add_operation--bfieldscol">
              <label className="add_operation--label" htmlFor="creditAsset">
                Списание (credit)
                <input
                  className="add_operation--input"
                  type="text"
                  name="creditAsset"
                  value={newOperation.creditAsset || ''}
                  onChange={handleChange}
                  id="creditAsset"
                />
              </label>

              <label className="add_operation--label" htmlFor="credit_sum">
                Сумма
                <input
                  className="add_operation--input"
                  type="number"
                  name="creditValue"
                  value={newOperation.creditValue || ''}
                  onChange={handleChange}
                  id="credit_sum"
                />
              </label>
            </div>

            <div className="add_operation--bfieldscol">
              <label className="add_operation--label" htmlFor="debitAsset">
                Зачисление (debit)
                <input
                  className="add_operation--input"
                  type="text"
                  name="debitAsset"
                  value={newOperation.debitAsset || ''}
                  onChange={handleChange}
                  id="debitAsset"
                />
              </label>

              <label className="add_operation--label" htmlFor="debit_sum">
                Сумма
                <input
                  className="add_operation--input"
                  type="number"
                  name="debitValue"
                  value={newOperation.debitValue || ''}
                  onChange={handleChange}
                  id="debit_sum"
                />
              </label>
            </div>
          </div>
          <label className="add_operation--label" htmlFor="comments">
            Примечания
            <textarea
              className="add_operation--input"
              name="comments"
              value={newOperation.comments || ''}
              onChange={handleChange}
              id="comments"
            />
          </label>
        </div>

        <div className="add_operation--col">
          <label className="add_operation--label" htmlFor="categories">
            Категории
            <input
              className="add_operation--input"
              type="text"
              name="categories"
              value={newOperation.categories || ''}
              onChange={handleChange}
              id="categories"
            />
          </label>

          <button className="add_operation--submit" type="submit">
            ДОБАВИТЬ
          </button>
        </div>
      </form>
    </div>
  );
};
