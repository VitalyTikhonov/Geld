import { globalShortcut } from 'electron';

export function setGlobalShortcut(shortcut: string, action: () => unknown) {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register(shortcut, action);

  if (!ret) {
    console.log(`Не удалось зарегистрировать шорткат ${shortcut}`);
  }
}
