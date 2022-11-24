export class GeldDBError {
  isGeldError: boolean;
  receivedError: unknown;

  constructor(receivedError: unknown) {
    this.isGeldError = true;
    this.receivedError = receivedError;
  }
}
