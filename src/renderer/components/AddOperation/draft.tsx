<>
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
    <div className="add_operation--field">
      <select name="creditCurrency" id="credit_currency">
        <option>₽</option>
        <option>$</option>
        <option>€</option>
        <option>Դ</option>
      </select>

      <input
        className="add_operation--input"
        type="number"
        name="creditValue"
        value={newOperation.creditValue || ''}
        onChange={handleChange}
        id="credit_sum"
      />
    </div>
  </label>
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
    <div className="add_operation--field">
      <select name="debitCurrency" id="debit_currency">
        <option>₽</option>
        <option>$</option>
        <option>€</option>
        <option>Դ</option>
      </select>

      <input
        className="add_operation--input"
        type="number"
        name="debitValue"
        value={newOperation.debitValue || ''}
        onChange={handleChange}
        id="debit_sum"
      />
    </div>
  </label>
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
</>;
