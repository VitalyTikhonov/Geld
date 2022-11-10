import { FormEvent, ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectNewOperation, setNewOperation } from 'store/operationsSlice';
import './AddOperation.css';

export const AddOperation = () => {
  const newOperation = useAppSelector(selectNewOperation);
  /* The form field names must match the properties of the Operation */
  const dispatch = useAppDispatch();
  useEffect(() => console.log('newOperation', newOperation), [newOperation]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    /* Save to Redux */
    const { name, value } = event.target;
    dispatch(setNewOperation({ ...newOperation, [name]: value }));
    // console.log('{ name, value }', { name, value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // console.log('OPERATION', newOperation);
    /* Pass from Redux to DB */
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
              <label className="add_operation--label" htmlFor="date">
                Дата
                <input
                  className="add_operation--input"
                  type="date"
                  name="date"
                  value={newOperation.date || ''}
                  onChange={handleChange}
                  id="date"
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
              <label className="add_operation--label" htmlFor="credit">
                Списание (credit)
                <input
                  className="add_operation--input"
                  type="text"
                  name="credit"
                  value={newOperation.credit || ''}
                  onChange={handleChange}
                  id="credit"
                />
              </label>

              <label className="add_operation--label" htmlFor="credit_sum">
                Сумма
                <input
                  className="add_operation--input"
                  type="number"
                  name="creditSum"
                  value={newOperation.creditSum || ''}
                  onChange={handleChange}
                  id="credit_sum"
                />
              </label>
            </div>

            <div className="add_operation--bfieldscol">
              <label className="add_operation--label" htmlFor="debit">
                Зачисление (debit)
                <input
                  className="add_operation--input"
                  type="text"
                  name="debit"
                  value={newOperation.debit || ''}
                  onChange={handleChange}
                  id="debit"
                />
              </label>

              <label className="add_operation--label" htmlFor="debit_sum">
                Сумма
                <input
                  className="add_operation--input"
                  type="number"
                  name="debitSum"
                  value={newOperation.debitSum || ''}
                  onChange={handleChange}
                  id="debit_sum"
                />
              </label>
            </div>
          </div>
          <label className="add_operation--label" htmlFor="notes">
            Примечания
            <textarea
              className="add_operation--input"
              name="notes"
              value={newOperation.notes || ''}
              onChange={handleChange}
              id="notes"
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
