/* eslint-disable react/require-default-props */
import cn from 'classnames';
import { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cross from '../ui';
import './index.scss';
import {
  IAddLineButton,
  IDropdown,
  // IFieldLabel,
  ILabeledField,
  INumericField,
  IRemoveLineButton,
  ISubmitButton,
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
        <option key={uuidv4()} /* className={cn()} */>{option}</option>
      ))}
    </select>
  );
}

// export function FieldLabel({
//   disabled,
//   htmlFor,
//   label,
// }: IFieldLabel): JSX.Element {
//   return (
//     <label
//       className={cn('form--label', { 'form--label-disabled': disabled })}
//       htmlFor={htmlFor}
//     >
//       {label}
//     </label>
//   );
// }

export function NumericField({
  value,
  onChange,
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
      onChange={onChange}
      id={id}
      step="0.01"
    />
  );
}

export function DateField({ value, disabled, id }: ITextField): JSX.Element {
  return (
    <input
      type="date"
      className={cn('form--field', { 'form--field-disabled': disabled })}
      disabled={disabled}
      value={value}
      id={id}
    />
  );
}

export function CommentsField({
  value,
  id,
  onChange,
}: ITextField): JSX.Element {
  return (
    <textarea
      className={cn('form--field', 'form--field-area')}
      value={value}
      id={id}
      onChange={onChange}
    />
  );
}

export function LabeledField<T>({
  disabled,
  id,
  label,
  children,
}: ILabeledField<T>): JSX.Element {
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

export function AddLineButton({
  disabled,
  onClick,
}: IAddLineButton): JSX.Element {
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

export function RemoveLineButton({
  onClick,
  id,
  disabled,
}: IRemoveLineButton): JSX.Element {
  // const handleClick = useCallback(() => onClick(id), [onClick, id]);
  const handleClick = useCallback(() => {
    if (onClick && id) {
      onClick(id);
    }
  }, [onClick, id]);
  // function handleClick() {
  //   if (onClick && id) {
  //     onClick(id);
  //   }
  // }

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      className={cn('form--button', 'form--button-remove')}
      disabled={disabled}
    >
      <Cross className="form--cross" />
    </button>
  );
}

export function SubmitButton({
  disabled,
  onClick,
}: ISubmitButton): JSX.Element {
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
