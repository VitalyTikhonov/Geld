import { Operation } from './Operation';
import { GeldDBError } from './errors';

export { Operation, GeldDBError };

export type DBQueryResult = Operation /* | other entities */;

export type DBResponse = DBQueryResult | GeldDBError;
