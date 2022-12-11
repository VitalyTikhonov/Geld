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

export function Dropdown({
  disabled,
  optionLabels,
  id,
}: IDropdown): JSX.Element {
  return (
    <select
      className={cn(
        'form--field',
        { 'form--field-disabled': disabled },
        'form--dropdown'
      )}
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
    <label
      className={cn('form--label', { 'form--label-disabled': disabled })}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}
export function NumericField({
  value,
  disabled,
  id,
  width,
}: INumericField): JSX.Element {
  return (
    <input
      type="number"
      className={cn('form--field', 'form--field-numeric', {
        'form--field-disabled': disabled,
        [`form--field-numeric-${width}`]: Boolean(width),
      })}
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
      className={cn('form--button', { 'form--button-disabled': disabled })}
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
      className={cn(
        'form--button',
        { 'form--button-disabled': disabled },
        'form--button-submit'
      )}
    >
      ДОБАВИТЬ
    </button>
  );
}

export function CommentsField({ value, id }: ITextField): JSX.Element {
  return (
    <textarea
      className={cn('form--field', 'form--field-area')}
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
      <label
        className={cn('form--label', { 'form--label-disabled': disabled })}
        htmlFor={id}
      >
        {label}
      </label>

      {children}
    </div>
  );
}
