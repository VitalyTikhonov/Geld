import fs, { appendFileSync } from 'fs';
// const fsPromises = require('fs/promises');
import { join } from 'path';

// function closeFile(path) {
//   return fs.close(path);
// }

// function getFirstFileName(path) {
//   return fs.readdirSync(path)[0];
// }

// async function getFileNames(path) {
//   return fsPromises.readdir(path);
// }

// async function readFile(dirname, fileName) {
//   const filePath = join(dirname, fileName);
//   const data = await fsPromises.readFile(filePath, { encoding: 'utf8' });
//   return data;
// }

export function readFileSnc(dirname, fileName) {
  const filePath = join(dirname, fileName);
  const data = fs.readFileSync(filePath, { encoding: 'utf8' });
  return data;
}

// async function readInputFile(dirname, inputFolderPath = './_input') {
//   const filePath = join(
//     dirname,
//     inputFolderPath,
//     getFirstFileName(`${dirname}/${inputFolderPath}`)
//   );
//   const data = await fsPromises.readFile(filePath, { encoding: 'utf8' });
//   return data;
// }

// async function readInputFiles(dirname, inputFolderPath = './_input') {
//   const fileNames = await getFileNames(`${dirname}/${inputFolderPath}`);
//   const filePaths = fileNames.map((fileName) =>
//     join(dirname, inputFolderPath, fileName)
//   );
//   const fileDataStrings = [];
//   await Promise.all(
//     filePaths.map(async (path) => {
//       const dataString = await fsPromises.readFile(path, { encoding: 'utf8' });
//       fileDataStrings.push(dataString);
//     })
//   );
//   return fileDataStrings;
// }

// async function removeFile(filePath) {
//   await fsPromises.rm(filePath);
// }

// async function download(data, filePath) {
//   await fsPromises.writeFile(filePath, data);
// }

export function logToFile(message) {
  appendFileSync(join(__dirname, '../../logs/db-connection.txt'), message);
}
