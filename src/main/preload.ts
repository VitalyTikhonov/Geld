import { contextBridge, ipcRenderer /* , IpcRendererEvent */ } from 'electron';
import { DBResponse, Operation } from '../types';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  saveOp: (operation: Operation): Promise<DBResponse> =>
    ipcRenderer.invoke('saveOperation', operation),
});
