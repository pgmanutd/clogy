/* @flow */

import * as fp from 'lodash/fp';
import clogy from '../../lib/clogy.js';

import type {
  getLoggersT,
  metaDataT,
  LoggerT,
  getPrefixT,
  getTagsFromMetaDataT,
  loggerMethodsT,
  decorateClogysLoggersUsingPrefixT
} from './flowTypes';

const decorateClogysLoggersUsingPrefix: decorateClogysLoggersUsingPrefixT = ({
  getLoggers,
  getPrefix,
  getTagsFromMetaData
}: loggerMethodsT, metaData: metaDataT) => (
  fp.reduce((accumulator: LoggerT, logger: string) => {
    accumulator[logger] = (...args: Array<any> ) => {
      clogy[logger](getPrefix({
        logger,
        tags: getTagsFromMetaData(metaData)
      }), ...args);
    };

    return accumulator;
  }, {})(getLoggers())
);

const getLoggers: getLoggersT<string> = () => [
  'log',
  'trace',
  'debug',
  'info',
  'warn',
  'error'
];

const getPrefix: getPrefixT = ({
  logger,
  tags
} = {}) => (
  `[${fp.toUpper(logger)}]${tags}`
);

const getTagsFromMetaData: getTagsFromMetaDataT = (metaData: metaDataT) => (
  fp
  .reduce
  .convert({ 'cap': false })((accumulator: string, value: any, key: any) => (
    `${accumulator} [${key}:${value}]`
  ), '')(metaData)
);

const LoggerWithMetadata: (metaData: metaDataT) => LoggerT = fp.partial(decorateClogysLoggersUsingPrefix, [{
  getLoggers,
  getPrefix,
  getTagsFromMetaData
}]);

export default LoggerWithMetadata;
