/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Menu,
  globalShortcut,
  IpcMainInvokeEvent,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { v4 } from 'uuid';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { dbConnection } from '../database';
import { setGlobalShortcut } from './utils';
import { logLabeled } from '../utilsGeneral/console';
import { Operation } from '../types/Operation';
import assets from '../types/assets.json';
import { Asset } from '../types/Asset';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    // if (process.env.START_MINIMIZED) {
    //   mainWindow.minimize();
    // } else {
    //   mainWindow.show();
    // }
    mainWindow.maximize();
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();
  // Menu.setApplicationMenu(
  //   Menu.buildFromTemplate([
  //     { label: 'CallDevMethod', click: callDevMethod, accelerator: 'Alt + Q' },
  //   ])
  // );
  Menu.setApplicationMenu(null);

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function callDevMethod(i: number) {
  const methods = [
    dbConnection.initializeDB,
    dbConnection.initializeDBAndTables,
    dbConnection.requestTableList,
    () => {
      logLabeled('assets', assets);
      (assets as Asset[]).forEach(async (a) => {
        a.id = v4();
        // eslint-disable-next-line prefer-destructuring
        a.openDate = new Date().toISOString().split('T')[0];
        try {
          await dbConnection.handleSaveAsset(a);
        } catch (err) {
          logLabeled('Error creating assets', err);
        }
      });
    },
  ];
  methods[i]();
}

app
  .whenReady()
  .then(async () => {
    setGlobalShortcut('Alt + 1', () => callDevMethod(0));
    setGlobalShortcut('Alt + 2', () => callDevMethod(1));
    setGlobalShortcut('Alt + 3', () => callDevMethod(2));
    setGlobalShortcut('Alt + 4', () => callDevMethod(3));
    setGlobalShortcut('Alt + 5', () => callDevMethod(4));
    setGlobalShortcut('Alt + 6', () => callDevMethod(5));
    setGlobalShortcut('Alt + 7', () => callDevMethod(6));
    setGlobalShortcut('Alt + 8', () => callDevMethod(7));
    setGlobalShortcut('Alt + 9', () => callDevMethod(8));
    setGlobalShortcut('Alt + 0', () => callDevMethod(9));

    dbConnection.initializeDBAndTables();

    ipcMain.handle(
      'saveOperation',
      (_: IpcMainInvokeEvent, operation: Operation) =>
        dbConnection.handleSaveOperation(operation)
    );
    ipcMain.handle('getAssets', (/* _: IpcMainInvokeEvent */) =>
      dbConnection.getAssets());

    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch((error) => logLabeled('MAIN app error:\n', error));

app.on('will-quit', () => globalShortcut.unregisterAll());
