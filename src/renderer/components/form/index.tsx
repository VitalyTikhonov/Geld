/* eslint-disable react/require-default-props */
import cn from 'classnames';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import Cross from '../ui';
import './index.scss';
import {
  GeChangeEvent,
  IAddLineButton,
  IDropdown,
  ILabeledField,
  INumericField,
  IOption,
  IRemoveLineButton,
  ISubmitButton,
  ITextField,
} from './types';

export function Dropdown({
  disabled,
  options,
  id,
  defaultValue,
  passValue,
  name,
  placeholder,
}: IDropdown): JSX.Element {
  const [value, setValue] = useState(defaultValue);

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
      onChange={(e: GeChangeEvent) => {
        if (typeof value === 'string') {
          setValue(e.target.value);
        } else {
          const optionsTyped = options as IOption[];
          const match = optionsTyped.find((o) => o.value === e.target.value);
          if (match) {
            setValue(match);
            passValue(match);
          }
        }
      }}
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
  defaultValue,
  passValue,
  disabled,
  id,
  width,
  name,
  placeholder,
}: INumericField): JSX.Element {
  const [value, setValue] = useState(defaultValue);

  return (
    <input
      type="number"
      name={name}
      className={cn('form--field', 'form--field-numeric', {
        'form--field-disabled': disabled,
        [`form--field-numeric-${width}`]: Boolean(width),
      })}
      disabled={disabled}
      value={value !== 0 ? value : ''}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.valueAsNumber);
        passValue(e.target.valueAsNumber);
      }}
      id={id}
      step="0.01"
      placeholder={placeholder}
    />
  );
}

export function DateField({
  defaultValue,
  disabled,
  id,
  name,
  passValue,
}: ITextField): JSX.Element {
  const [value, setValue] = useState(defaultValue);

  return (
    <input
      type="date"
      name={name}
      className={cn('form--field', { 'form--field-disabled': disabled })}
      disabled={disabled}
      value={value}
      onChange={(e: GeChangeEvent) => {
        setValue(e.target.value);
        passValue(e.target.value);
      }}
      id={id}
    />
  );
}

export function CommentsField({
  name,
  id,
  defaultValue,
  passValue,
}: ITextField): JSX.Element {
  const [value, setValue] = useState(defaultValue);

  return (
    <textarea
      name={name}
      className={cn('form--field', 'form--field-area')}
      value={value}
      id={id}
      onChange={(e: GeChangeEvent) => {
        setValue(e.target.value);
        passValue(e.target.value);
      }}
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
      id="addLineButton"
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn('form--button', { 'form--button-disabled': disabled })}
    >
      + Строка
    </button>
  );
}

export function ConsolidateLinesButton({
  disabled,
  onClick,
}: IAddLineButton): JSX.Element {
  return (
    <button
      id="consolidateLinesButton"
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn('form--button', { 'form--button-disabled': disabled })}
    >
      Объединить по категориям
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

export function SubmitButton({ disabled }: ISubmitButton): JSX.Element {
  return (
    <button
      type="submit"
      disabled={disabled}
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
