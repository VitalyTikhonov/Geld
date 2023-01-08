import { ChangeEvent } from 'react';

export type IOption<T = string> = {
  value: T | undefined;
  label: string | undefined;
};
export type GeChangeEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

export type GeChangeHandler = (event: GeChangeEvent) => void;

interface IFormElement {
  // eslint-disable-next-line react/no-unused-prop-types
  disabled?: boolean;
  width?: 'narrow';
}

interface IField<T> extends IFormElement {
  // eslint-disable-next-line react/no-unused-prop-types
  id: string;
  name: string;
  defaultValue: T | undefined;
  passValue: (arg: T) => void;
  placeholder?: string;
}

export interface IDropdown extends IField<IOption | string> {
  options: IOption[] | string[];
}

export interface IDropdownSimple extends IField<string> {
  options: string[];
}

export type INumericField = IField<number>;

export type ITextField = IField<string>;

export type ISubmitButton = IFormElement;

export interface IRemoveLineButton extends IFormElement {
  onClick: (id: string) => void;
  id: string;
}

export interface IAddLineButton extends IFormElement {
  onClick: () => void;
}

export interface ILabeledField<T> extends Partial<IField<T>> {
  children: React.ReactNode;
  label: string;
}

export type FormField = IDropdown | INumericField | ITextField;
