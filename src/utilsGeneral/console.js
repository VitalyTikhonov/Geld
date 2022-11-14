/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const util = require('util');

function callInspect(data) {
  return util.inspect(data, { showHidden: false, depth: null, colors: true });
}

const _s = '\x1b[32m\x1b[1m'; // \x1b[ - оператор начала указания стиля, 32m - зеленый, 1m - жирный
const e_ = '\x1b[0m'; // 0m - сбросить стили, назначенные предшествующей части строки

/** Выводит пары ярлык-содержимое в консоль node.js, выделяя ярлык зеленым цветом.
 * ДЛЯ NODE.JS – для такого кода, который выводит логи в консоль процесса node.js.
 * При необходимости можно адаптировать для браузера, изменив передачу стилей.
 * https://davidlozzi.com/2021/03/16/style-up-your-console-logs/
 * https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
 */
function logLabeled(...args) {
  const consoleLogArguments = [''];
  // '' - для устранения непонятного отступа в консоли терминала

  args.forEach((item, index) => {
    if (index % 2 === 0) {
      if (typeof item === 'string' && item.length > 0) {
        consoleLogArguments.push(`${_s}${item}${e_}`);
      }
    } else {
      consoleLogArguments.push(callInspect(item));
      consoleLogArguments.push('\n');
    }
  });
  console.log(...consoleLogArguments);
}
/* Пример вызова
    import { logLabeled } from './console';

    logLabeled(
      'label', object,
      'label', variable,
      '', objectDoesNotNeedLabel
    );
 */

function log(labelOrData, data) {
  const items = [];
  if (typeof labelOrData === 'string') {
    items.push(labelOrData);
  } else {
    items.push(callInspect(labelOrData));
  }
  if (data !== undefined) {
    items.push(data);
  }
  console.log(...items);
}

module.exports = { logLabeled, log };
