/* eslint-disable react/require-default-props */
import cn from 'classnames';
import './index.scss';
import {
  IDropdown,
  IFieldLabel,
  IFormButton,
  ILabeledField,
  INumericField,
  ITextField,
} from './types';

function makeCn( /* Убрать, передавать непоср. ПОсмотреть доку по способам объявления
Сделать ширину поля курса */
  basicClassname: string,
  disabled = false,
  ...additionalClasses: string[]
): string {
  return cn(
    basicClassname,
    { [`${basicClassname}-disabled`]: disabled },
    ...additionalClasses
  );
}

export function Dropdown({
  disabled,
  optionLabels,
  id,
}: IDropdown): JSX.Element {
  return (
    <select
      className={makeCn('form--field', disabled, 'form--dropdown')}
      disabled={disabled}
      id={id}
    >
      {optionLabels.map((option) => (
        <option /* className={cn()} */>{option}</option>
      ))}
    </select>
  );
}

export function FieldLabel({
  disabled,
  htmlFor,
  label,
}: IFieldLabel): JSX.Element {
  return (
    <label className={makeCn('form--label', disabled)} htmlFor={htmlFor}>
      {label}
    </label>
  );
}
export function NumericField({
  value,
  disabled,
  id,
  size,
}: INumericField): JSX.Element {
  return (
    <input
      type="number"
      className={makeCn('form--field', disabled, size)}
      disabled={disabled}
      value={value}
      id={id}
      step="0.01"
    />
  );
}

export function AddLineButton({ disabled, onClick }: IFormButton): JSX.Element {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={makeCn('form--button', disabled)}
    >
      + Строка
    </button>
  );
}

export function SubmitButton({ disabled, onClick }: IFormButton): JSX.Element {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={makeCn('form--button', disabled, 'form--button-submit')}
    >
      ДОБАВИТЬ
    </button>
  );
}

export function CommentsField({ value, id }: ITextField): JSX.Element {
  return (
    <textarea
      className={makeCn('form--field', false, 'form--field-area')}
      value={value}
      id={id}
    />
  );
}

export function LabeledFiled({
  disabled,
  id,
  label,
  children,
}: ILabeledField): JSX.Element {
  return (
    <div className="form--labeled_field">
      <label className={makeCn('form--label', disabled)} htmlFor={id}>
        {label}
      </label>

      {children}
    </div>
  );
}
