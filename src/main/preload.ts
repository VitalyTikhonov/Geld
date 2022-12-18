import { contextBridge, ipcRenderer } from 'electron';
import { DBResponse } from '../types';
import { Operation } from '../types/Operation';
import { Asset } from '../types/Asset';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  saveOp: (operation: Operation): Promise<DBResponse<Operation>> =>
    ipcRenderer.invoke('saveOperation', operation),
  getAssets: (): Promise<DBResponse<Asset[]>> =>
    ipcRenderer.invoke('getAssets'),
});
