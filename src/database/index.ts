/* eslint-disable func-names */
import { IpcMainInvokeEvent } from 'electron';
import { join } from 'path';
import sqlite3 from 'sqlite3';
// import { readFileSnc } from '../main/utils/fileSystem';
import { logLabeled } from '../utilsGeneral/console';
import { Operation } from '../utilsGeneral/Operation';

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
const CREATE_ASSETS_TABLE_QUERY = {
  name: 'ASSETS',
  query: `
    CREATE TABLE IF NOT EXISTS assets (
      id INTEGER PRIMARY KEY,
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
      FOREIGN KEY (creditAsset) REFERENCES assets (id) ON DELETE CASCADE ON UPDATE NO ACTION,
      FOREIGN KEY (debitAsset) REFERENCES assets (id) ON DELETE CASCADE ON UPDATE NO ACTION
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
  }

  private createTable(name: string, query: string): void {
    this.db.get(query, function (error, row) {
      if (error) {
        logLabeled(`Error while creating the ${name} table:\n`, error);
      } else {
        logLabeled(`Table ${name} creation result:\n`, row);
      }
    });
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
    this.db.all(REQUEST_TABLES, function (error, rows) {
      if (error) {
        logLabeled('Error while requesting the table list:\n', error);
      } else {
        logLabeled('The tables:\n', rows);
      }
    });
  }

  handleSaveOperation(_: IpcMainInvokeEvent, operation: Operation): void {
    const {
      date,
      rate,
      credit,
      creditSum,
      debit,
      debitSum,
      notes,
      categories,
    } = operation;
    logLabeled('this', this);
    this.db.get(
      'INSERT INTO operations VALUES($date, $rate, $credit, $creditSum, $debit, $debitSum, $notes, $categories) RETURNING *',
      {
        $date: date,
        $rate: rate,
        $credit: credit,
        $creditSum: creditSum,
        $debit: debit,
        $debitSum: debitSum,
        $notes: notes,
        $categories: categories,
      },
      function (error, row) {
        if (error)
          logLabeled('Error while inserting a row into Operations:\n', error);
        if (row)
          logLabeled('Successfully inserted a row into Operations:\n', row);
      }
    );
  }
}

export const dbConnection = new DBConnection();
