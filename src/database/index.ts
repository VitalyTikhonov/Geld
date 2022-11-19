import { logLabeled } from '../utilsGeneral/console';
import { readFileSnc } from '../main/utils/fileSystem';

export async function prepareDB(): Promise<any> {
  let client;
  const sqlScript = readFileSnc(__dirname, 'database.sql').toString();
  try {
    return client;
  } catch (error) {
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
