import { DBResponse } from '../types';
import { Operation } from '../types/Operation';
import { Asset } from '../types/Asset';

declare global {
  interface Window {
    electron: {
      saveOp(operation: Operation): Promise<DBResponse<Operation>>;
      getAssets(): Promise<DBResponse<Asset[]>>;
    };
  }
}

export {};
