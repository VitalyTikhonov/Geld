import fs from 'fs';
import { log } from '../utilsGeneral/console';
import { readFileSnc } from '../main/utils/fileSystem';

const { Pool } = require('pg');

const applicationDatabaseName = 'geld_v2';
const applicationDatabaseUser = 'postgres';
const applicationDatabasePassword = 'ZaNJx';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: applicationDatabaseUser,
  password: applicationDatabasePassword,
  // database: applicationDatabaseName, // ост.на: успешно создаем БД, но не подключаемся
});

export default pool;

async function isDBExistent(dbName: string) {
  const dbQuery = await pool.query(
    `SELECT * FROM pg_database WHERE datname = $1`,
    [dbName]
  );
  return Boolean(dbQuery.rows.length);
}

export async function createDB<T>(): Promise<T> {
  const isExistent1 = await isDBExistent(applicationDatabaseName);
  log('isExistent1', isExistent1);
  let dbQuery;
  if (!isExistent1) {
    // database does not exist, make it:
    dbQuery = await pool.query(`CREATE DATABASE ${applicationDatabaseName}`);
    const isExistent2 = await isDBExistent(applicationDatabaseName);
    log('isExistent2', isExistent2);
  }

  // const userQuery = await pool.query(
  //   `SELECT FROM pg_roles where rolname = $1`,
  //   [applicationDatabaseUser]
  // );
  // log('userQuery', userQuery);
  // log('userQuery.rows', userQuery.rows);

  // if (userQuery.rows.length === 0) {
  //   // user doesn't exist. make it
  //   await pool.query(
  //     `CREATE USER ${applicationDatabaseUser} with ENCRYPTED PASSWORD '${applicationDatabasePassword}'`
  //   );
  //   await pool.query(
  //     `GRANT ALL PRIVILEGES ON DATABASE ${applicationDatabaseName} TO ${applicationDatabaseUser}`
  //   );
  // }

  // await pool.end();

  const sqlScript = readFileSnc(__dirname, 'database.sql').toString();
  // log('WTF?????????', sqlScript.slice(150, 165));
  const res = await pool.query(sqlScript);
  // const res = await pool.query('SELECT * FROM pg_tables;');
  return res;
}

export async function handleSaveOperation() {
  // log('reached handleSaveOperation');
  // try {
  //   const res = await createDB();
  //   log('DB creation result', {
  //     // keys: Object.keys(res),
  //     tables: res,
  //     // tables: res.rows?.map((i) => i.tablename),
  //   });
  // } catch (error) {
  //   log('DB creation error', error);
  // }
}
