import { ChangeEvent } from 'react';

interface IFormElement {
  // eslint-disable-next-line react/no-unused-prop-types
  disabled?: boolean;
  width?: 'narrow';
}

export type ChangeEventSubset = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type GeneralChangeHandler = (arg: ChangeEventSubset | IOption) => void;

interface IField<T> extends IFormElement {
  // eslint-disable-next-line react/no-unused-prop-types
  id: string;
  name: string;
  value?: T;
  onChange: GeneralChangeHandler;
}

export type IOption<T = string> = { value: T; name: string };

export interface IDropdown extends IField<string> {
  options: string[] | IOption[];
  isSimple?: boolean;
}

// export interface IFieldLabel extends IFormElement {
//   htmlFor: string;
//   label: string;
// }

export type INumericField = IField<number>;

export type ITextField = IField<string>;

export interface ISubmitButton extends IFormElement {
  onClick: (...args: unknown[]) => unknown;
}

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
