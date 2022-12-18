import { GeldDBError } from './errors';

export type DBResponse<T> = T | GeldDBError;
