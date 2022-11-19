import { Client } from 'pg';
import { logLabeled } from '../utilsGeneral/console';
import { readFileSnc } from '../main/utils/fileSystem';

const appDBName = 'geld_v2';
const appDBUser = 'postgres';
const appDBPassword = 'ZaNJx';

const config = {
  host: 'localhost',
  port: 5432,
  user: appDBUser,
  password: appDBPassword,
  database: appDBUser,
};

const geldDBCheckError = `Geld DB check error`;

async function getConnectedClient(
  dbName: string = appDBUser
): Promise<Client | Error> {
  config.database = dbName;
  const client = new Client(config);
  try {
    await client.connect();
    return client;
  } catch (error) {
    const nextError = new Error();
    nextError.message = geldDBCheckError;
    throw nextError; // not return! Otherwise "client.query" in prepareDB>try will be executed
  }
}

export async function prepareDB(): Promise<Client | Error> {
  let client: Client;
  const sqlScript = readFileSnc(__dirname, 'database.sql').toString();
  try {
    const clientWithPrevDB = (await getConnectedClient(appDBName)) as Client;
    logLabeled(`1. Connected to the previously created database ${appDBName}`);
    client = clientWithPrevDB;
    await client.query(sqlScript);
    return client;
  } catch (error) {
    if ((error as Error).message === geldDBCheckError) {
      logLabeled(
        `2. Could not connect to a previously created database, creating a new one called ${appDBName}...`
      );
      const clientWithDefaultDB = (await getConnectedClient()) as Client; // no db name arg - to connect to the default db
      await clientWithDefaultDB.query(`CREATE DATABASE ${appDBName}`);
      clientWithDefaultDB.end();
      logLabeled(`3. Created a new database ${appDBName}`);
      const clientWithNewDB = (await getConnectedClient(appDBName)) as Client;
      client = clientWithNewDB;
      await client.query(sqlScript);
      logLabeled(`4. Created the database tables`);
      return client;
    }
    throw error;
  }
}

export async function handleSaveOperation() {
  // log('reached handleSaveOperation');
  // try {
  //   const res = await prepareDB();
  //   log('DB creation result', {
  //     // keys: Object.keys(res),
  //     tables: res,
  //     // tables: res.rows?.map((i) => i.tablename),
  //   });
  // } catch (error) {
  //   log('DB creation error', error);
  // }
}
