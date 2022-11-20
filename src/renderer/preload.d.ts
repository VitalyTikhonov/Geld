import { Operation } from '../utilsGeneral/Operation';

declare global {
  interface Window {
    electron: {
      saveOp(operation: Operation): void;
    };
  }
}

export {};
