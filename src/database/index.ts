/* eslint-disable func-names */
import { join } from 'path';
import sqlite3 from 'sqlite3';
// import { readFileSnc } from '../main/utils/fileSystem';
import { logLabeled } from '../utilsGeneral/console';
import { Operation } from '../types/Operation';
import { DBResponse } from '../types';
import { GeldDBError } from '../types/errors';
import { Asset } from '../types/Asset';

const REQUEST_TABLES = `SELECT name FROM sqlite_schema WHERE type ='table';`;
const CREATE_ASSETS_TABLE_QUERY = {
  name: 'ASSETS',
  query: `
    CREATE TABLE IF NOT EXISTS assets (
      name TEXT NOT NULL PRIMARY KEY,
      id TEXT NOT NULL,
      currency TEXT NOT NULL,
      balance REAL NOT NULL,
      openDate TEXT NOT NULL,
      closeDate TEXT,
      description TEXT
    );
  `,
};
const CREATE_OPERATIONS_TABLE_QUERY = {
  name: 'OPERATIONS',
  query: `
    CREATE TABLE IF NOT EXISTS operations (
      id TEXT NOT NULL PRIMARY KEY,
      transactionId TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      creditAssetId TEXT NOT NULL,
      creditCurrencyCode TEXT NOT NULL,
      creditOpAmount REAL NOT NULL,
      creditTrAmount REAL NOT NULL,
      debitAssetId TEXT NOT NULL,
      debitCurrencyCode TEXT NOT NULL,
      debitOpAmount REAL NOT NULL,
      debitTrAmount REAL NOT NULL,
      rate REAL,
      categories TEXT,
      comments TEXT,
      FOREIGN KEY (creditAssetId) REFERENCES assets (id) ON DELETE CASCADE ON UPDATE NO ACTION,
      FOREIGN KEY (debitAssetId) REFERENCES assets (id) ON DELETE CASCADE ON UPDATE NO ACTION
    );
  `,
};

class DBConnection {
  sqlite3Verbose: sqlite3.sqlite3;
  db!: sqlite3.Database;

  constructor() {
    this.initializeDB = this.initializeDB.bind(this);
    this.createTable = this.createTable.bind(this);
    this.initializeDBAndTables = this.initializeDBAndTables.bind(this);
    this.requestTableList = this.requestTableList.bind(this);
    this.handleSaveOperation = this.handleSaveOperation.bind(this);
    this.sqlite3Verbose = sqlite3.verbose();
  }

  initializeDB() {
    try {
      const db = new this.sqlite3Verbose.Database(
        join(__dirname, './_geld_v2.sqlite3'),
        (error) => {
          if (error === null) {
            logLabeled('new sqlite3verbose.Database successful');
          } else {
            logLabeled('sqlite3verbose.Database error\n', error);
          }
        }
      );
      this.db = db;
    } catch (error) {
      logLabeled('Error at initializeDB caught:\n', error);
    }
  }

  private createTable(name: string, query: string): void {
    try {
      this.db.get(query, function (error, row) {
        if (error) {
          logLabeled(`Error while creating the ${name} table:\n`, error);
        } else {
          logLabeled(`Table ${name} creation result:\n`, row);
        }
      });
    } catch (error) {
      logLabeled('Error at createTable caught:\n', error);
    }
  }

  initializeDBAndTables(): void {
    this.initializeDB();
    // const sqlScript = readFileSnc(__dirname, 'database.sql').toString();
    // this.createTable(
    //   CREATE_CURRENCIES_TABLE_QUERY.name,
    //   CREATE_CURRENCIES_TABLE_QUERY.query
    // );
    this.createTable(
      CREATE_ASSETS_TABLE_QUERY.name,
      CREATE_ASSETS_TABLE_QUERY.query
    );
    this.createTable(
      CREATE_OPERATIONS_TABLE_QUERY.name,
      CREATE_OPERATIONS_TABLE_QUERY.query
    );
  }

  requestTableList() {
    try {
      this.db.all(REQUEST_TABLES, function (error, rows) {
        if (error) {
          logLabeled('Error while requesting the table list:\n', error);
        } else {
          logLabeled('The tables:\n', rows);
        }
      });
    } catch (error) {
      logLabeled('Error at requestTableList caught:\n', error);
    }
  }

  handleSaveOperation(operation: Operation): Promise<DBResponse<Operation>> {
    const {
      id,
      transactionId,
      timestamp,
      rate,
      creditAssetId,
      creditCurrencyCode,
      creditOpAmount,
      creditTrAmount,
      debitAssetId,
      debitCurrencyCode,
      debitOpAmount,
      debitTrAmount,
      comments,
      categories,
    } = operation;
    return new Promise<DBResponse<Operation>>((resolve, reject) => {
      try {
        this.db.get(
          'INSERT INTO operations VALUES($id, $transactionId, $timestamp, $creditAssetId, $creditCurrencyCode, $creditOpAmount, $creditTrAmount, $debitAssetId, $debitCurrencyCode, $debitOpAmount, $debitTrAmount, $rate, $categories, $comments) RETURNING rowid, *;',
          {
            $id: id,
            $transactionId: transactionId,
            $timestamp: timestamp,
            $creditAssetId: creditAssetId,
            $creditCurrencyCode: creditCurrencyCode,
            $creditOpAmount: creditOpAmount,
            $creditTrAmount: creditTrAmount,
            $debitAssetId: debitAssetId,
            $debitCurrencyCode: debitCurrencyCode,
            $debitOpAmount: debitOpAmount,
            $debitTrAmount: debitTrAmount,
            $rate: rate,
            $categories: categories,
            $comments: comments,
          },
          function (error, row) {
            if (error) {
              // logLabeled('Error while inserting a row into Operations:\n');
              reject(new GeldDBError(error));
            }
            if (row) {
              // logLabeled('Successfully inserted a row into Operations:\n', row);
              resolve(row);
            }
          }
        );
      } catch (error) {
        // logLabeled('Error at handleSaveOperation caught:\n', error);
        reject(new GeldDBError(error));
      }
    });
  }

  handleSaveAsset(asset: Asset): Promise<DBResponse<Asset>> {
    const { name, id, currency, balance, openDate, closeDate, description } =
      asset;
    return new Promise<DBResponse<Asset>>((resolve, reject) => {
      try {
        this.db.get(
          'INSERT INTO assets VALUES($name, $id, $currency, $balance, $openDate, $closeDate, $description) RETURNING rowid, *;',
          {
            $name: name,
            $id: id,
            $currency: currency,
            $balance: balance,
            $openDate: openDate,
            $closeDate: closeDate,
            $description: description,
          },
          function (error, row) {
            if (error) {
              // logLabeled('Error while inserting a row into Assets:\n');
              reject(new GeldDBError(error));
            }
            if (row) {
              // logLabeled('Successfully inserted a row into Assets:\n', row);
              resolve(row);
            }
          }
        );
      } catch (error) {
        // logLabeled('Error at handleSaveOperation caught:\n', error);
        reject(new GeldDBError(error));
      }
    });
  }

  getAssets(): Promise<DBResponse<Asset[]>> {
    return new Promise<Asset[]>((resolve, reject) => {
      try {
        this.db.all('SELECT * FROM assets', function (error, rows) {
          if (error) {
            logLabeled('Error while getting assets:\n');
            reject(new GeldDBError(error));
          }
          if (rows) {
            logLabeled('Successfully got assets:\n', rows);
            resolve(rows);
          }
        });
      } catch (error) {
        // logLabeled('Error at handleSaveOperation caught:\n', error);
        reject(new GeldDBError(error));
      }
    });
  }
}

export const dbConnection = new DBConnection();
