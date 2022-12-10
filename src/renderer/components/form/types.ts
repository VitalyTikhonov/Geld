import { FC } from 'react';

interface IFormElement {
  // eslint-disable-next-line react/no-unused-prop-types
  disabled?: boolean;
}

interface IField extends IFormElement {
  // eslint-disable-next-line react/no-unused-prop-types
  id: string;
}

export interface IDropdown extends IField {
  optionLabels: string[];
}

export interface IFieldLabel extends IFormElement {
  htmlFor: string;
  label: string;
}

export interface INumericField extends IField {
  value: number;
}

export interface ITextField extends IField {
  value: string;
}

export interface IFormButton extends IFormElement {
  onClick: () => unknown;
}

export interface ILabeledField extends IField {
  children: React.ReactNode;
  label: string;
}

export type FormField = IDropdown | INumericField | ITextField;
