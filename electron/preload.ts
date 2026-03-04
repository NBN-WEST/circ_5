import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  store: {
    get: (key: string) => ipcRenderer.invoke('store:get', key),
    set: (key: string, value: unknown) => ipcRenderer.invoke('store:set', key, value),
    delete: (key: string) => ipcRenderer.invoke('store:delete', key)
  },

  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),

  platform: process.platform,
  version: process.versions.electron
});

declare global {
  interface Window {
    electronAPI: {
      store: {
        get: (key: string) => Promise<unknown>;
        set: (key: string, value: unknown) => Promise<boolean>;
        delete: (key: string) => Promise<boolean>;
      };
      openExternal: (url: string) => Promise<{ success: boolean; error?: string }>;
      platform: string;
      version: string;
    };
  }
}
