/* eslint-disable func-names */
import { IpcMainInvokeEvent } from 'electron';
import { join } from 'path';
import sqlite3 from 'sqlite3';
// import { readFileSnc } from '../main/utils/fileSystem';
import { logLabeled } from '../utilsGeneral/console';
import { Operation } from '../types/Operation';
import { GeldDBError, DBResponse } from '../types';

const REQUEST_TABLES = `SELECT name FROM sqlite_schema WHERE type ='table';`;
const CREATE_CURRENCIES_TABLE_QUERY = {
  name: 'CURRENCIES',
  query: `
    CREATE TABLE IF NOT EXISTS currencies (
      name TEXT NOT NULL,
      symbol TEXT,
      code TEXT PRIMARY KEY,
      description TEXT
    );
  `,
};
// id INTEGER PRIMARY KEY,
const CREATE_ASSETS_TABLE_QUERY = {
  name: 'ASSETS',
  query: `
    CREATE TABLE IF NOT EXISTS assets (
      name TEXT NOT NULL,
      currency TEXT NOT NULL,
      balance REAL,
      description TEXT,
      FOREIGN KEY (currency) REFERENCES currencies (code) ON DELETE CASCADE ON UPDATE NO ACTION
    );
  `,
};
const CREATE_OPERATIONS_TABLE_QUERY = {
  name: 'OPERATIONS',
  query: `
    CREATE TABLE IF NOT EXISTS operations (
      timestamp TEXT NOT NULL,
      creditAsset TEXT NOT NULL,
      creditValue REAL NOT NULL,
      debitAsset TEXT NOT NULL,
      debitValue REAL NOT NULL,
      rate REAL NOT NULL,
      categories TEXT NOT NULL,
      comments TEXT,
      FOREIGN KEY (creditAsset) REFERENCES assets (rowid) ON DELETE CASCADE ON UPDATE NO ACTION,
      FOREIGN KEY (debitAsset) REFERENCES assets (rowid) ON DELETE CASCADE ON UPDATE NO ACTION
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
    this.createTable(
      CREATE_CURRENCIES_TABLE_QUERY.name,
      CREATE_CURRENCIES_TABLE_QUERY.query
    );
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

  handleSaveOperation(
    _: IpcMainInvokeEvent,
    operation: Operation
  ): Promise<DBResponse> {
    const {
      timestamp,
      rate,
      creditAsset,
      creditValue,
      debitAsset,
      debitValue,
      comments,
      categories,
    } = operation;
    return new Promise<DBResponse>((resolve, reject) => {
      try {
        this.db.get(
          'INSERT INTO operations VALUES($timestamp, $creditAsset, $creditValue, $debitAsset, $debitValue, $rate, $categories, $comments) RETURNING rowid, *;',
          {
            $timestamp: timestamp,
            $creditAsset: creditAsset,
            $creditValue: creditValue,
            $debitAsset: debitAsset,
            $debitValue: debitValue,
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
}

export const dbConnection = new DBConnection();
