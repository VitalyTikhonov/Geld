/* eslint-disable react/require-default-props */
import cn from 'classnames';
import { useCallback, useMemo } from 'react';
import Cross from '../ui';
import './index.scss';
import {
  IAddLineButton,
  IDropdown,
  ILabeledField,
  INumericField,
  IRemoveLineButton,
  ISubmitButton,
  ITextField,
} from './types';

export function Dropdown({
  disabled,
  options,
  id,
  value,
  name,
  placeholder,
  onChange,
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
      value={typeof value === 'string' ? value : value?.value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
    >
      {options.map((option) => {
        if (typeof option === 'string') {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        }
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
}

export function NumericField({
  value,
  onChange,
  disabled,
  id,
  width,
  name,
}: INumericField): JSX.Element {
  return (
    <input
      type="number"
      name={name}
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

export function DateField({
  value,
  disabled,
  id,
  name,
  onChange,
}: ITextField): JSX.Element {
  return (
    <input
      type="date"
      name={name}
      className={cn('form--field', { 'form--field-disabled': disabled })}
      disabled={disabled}
      value={value}
      onChange={onChange}
      id={id}
    />
  );
}

export function CommentsField({
  value,
  name,
  id,
  onChange,
}: ITextField): JSX.Element {
  return (
    <textarea
      name={name}
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
  const handleClick = useCallback(() => {
    if (onClick && id) {
      onClick(id);
    }
  }, [onClick, id]);

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
