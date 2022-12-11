interface IFormElement {
  // eslint-disable-next-line react/no-unused-prop-types
  disabled?: boolean;
  width?: 'narrow';
}

interface IField<T> extends IFormElement {
  // eslint-disable-next-line react/no-unused-prop-types
  id: string;
  value?: T;
  onChange: () => void;
}

export interface IDropdown extends IField<string> {
  optionLabels: string[];
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
