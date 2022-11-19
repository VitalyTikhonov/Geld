import { contextBridge, ipcRenderer /* , IpcRendererEvent */ } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  saveOp() {
    ipcRenderer.invoke('saveOperation');
  },
});
