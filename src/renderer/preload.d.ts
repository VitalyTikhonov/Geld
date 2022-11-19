declare global {
  interface Window {
    electron: {
      saveOp(): void;
    };
  }
}

export {};
