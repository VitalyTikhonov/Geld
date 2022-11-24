import { DBResponse, Operation } from '../types';

declare global {
  interface Window {
    electron: {
      saveOp(operation: Operation): Promise<DBResponse>;
    };
  }
}

export {};
