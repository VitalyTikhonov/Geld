import {
  Dispatch,
  FormEvent,
  ChangeEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Operation } from 'utils/Operation';
import './AddOperation.css';

export const AddOperation = () => {
  const [operation, setOperation] = useState(
    new Operation({ date: new Date().toISOString().split('T')[0] })
  );
  // useEffect(() => console.log('operations', operation), [operation]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    // console.log({ name, value });
    setOperation({ ...operation, [name]: value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // console.log(Object.entries(event));
    console.log('OPERATION', operation);
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
                  value={operation.date}
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
                  value={operation.rate}
                  onChange={handleChange}
                  id="rate"
                />
              </label>
            </div>

            <div className="add_operation--bfieldscol">
              <label className="add_operation--label" htmlFor="credit">
                Списание
                <input
                  className="add_operation--input"
                  type="text"
                  name="credit"
                  value={operation.credit}
                  onChange={handleChange}
                  id="credit"
                />
              </label>

              <label className="add_operation--label" htmlFor="credit_sum">
                Сумма
                <input
                  className="add_operation--input"
                  type="number"
                  name="credit_sum"
                  value={operation.creditSum}
                  onChange={handleChange}
                  id="credit_sum"
                />
              </label>
            </div>

            <div className="add_operation--bfieldscol">
              <label className="add_operation--label" htmlFor="debit">
                Зачисление
                <input
                  className="add_operation--input"
                  type="text"
                  name="debit"
                  value={operation.debit}
                  onChange={handleChange}
                  id="debit"
                />
              </label>

              <label className="add_operation--label" htmlFor="debit_sum">
                Сумма
                <input
                  className="add_operation--input"
                  type="number"
                  name="debit_sum"
                  value={operation.debitSum}
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
              value={operation.notes}
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
              value={operation.categories}
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
