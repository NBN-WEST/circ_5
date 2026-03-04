import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';
import Store from 'electron-store';

const store = new Store({
  encryptionKey: 'circolo-quinte-secure-key-2024',
  name: 'secure-config'
});

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  Menu.setApplicationMenu(null);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#1a202c',
    icon: path.join(__dirname, '../public/icon.png'),
    title: 'Circolo delle Quinte'
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers - Secure Storage
ipcMain.handle('store:get', async (_, key: string) => {
  try {
    return store.get(key);
  } catch (error) {
    console.error('Store get error:', error);
    return null;
  }
});

ipcMain.handle('store:set', async (_, key: string, value: unknown) => {
  try {
    store.set(key, value);
    return true;
  } catch (error) {
    console.error('Store set error:', error);
    return false;
  }
});

ipcMain.handle('store:delete', async (_, key: string) => {
  try {
    store.delete(key);
    return true;
  } catch (error) {
    console.error('Store delete error:', error);
    return false;
  }
});

// URL Validation Security
ipcMain.handle('open-external', async (_, url: string) => {
  const { shell } = require('electron');

  const allowedDomains = [
    'anthropic.com',
    'docs.anthropic.com',
    'github.com'
  ];

  try {
    const urlObj = new URL(url);
    if (allowedDomains.some(domain => urlObj.hostname.endsWith(domain))) {
      await shell.openExternal(url);
      return { success: true };
    } else {
      return { success: false, error: 'URL non autorizzato' };
    }
  } catch (error) {
    return { success: false, error: 'URL non valido' };
  }
});
