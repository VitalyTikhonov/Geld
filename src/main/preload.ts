import { contextBridge, ipcRenderer /* , IpcRendererEvent */ } from 'electron';
import { Operation } from '../utilsGeneral/Operation';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  saveOp(operation: Operation) {
    ipcRenderer.invoke('saveOperation', operation);
  },
});
