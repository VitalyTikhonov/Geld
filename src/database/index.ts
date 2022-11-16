import { Client } from 'pg';
import { log } from '../utilsGeneral/console';
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
    log(`${geldDBCheckError}, error:\n`, error);
    const nextError = new Error();
    nextError.message = geldDBCheckError;
    return nextError;
  }
}

export async function prepareDB(): Promise<Client | Error> {
  let client: Client;
  try {
    const clientWithPrevDB = (await getConnectedClient(appDBName)) as Client;
    client = clientWithPrevDB;
  } catch (error) {
    if ((error as Error).message === geldDBCheckError) {
      const clientWithDefaultDB = (await getConnectedClient()) as Client; // no db name arg - to connect to the default db
      await clientWithDefaultDB.query(`CREATE DATABASE ${appDBName}`);
      clientWithDefaultDB.end();
      const clientWithNewDB = (await getConnectedClient(appDBName)) as Client;
      client = clientWithNewDB;
    } else {
      throw error;
    }
  }

  const sqlScript = readFileSnc(__dirname, 'database.sql').toString();
  await client.query(sqlScript);
  return client;
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
