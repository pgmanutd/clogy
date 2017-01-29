/* @flow */

export type getLoggersT<T> = () => Array<T>;

export type metaDataT = Object;

export type LoggerT = {
  log: () => void,
  trace: () => void,
  debug: () => void,
  info: () => void,
  warn: () => void,
  error: () => void
}

export type getPrefixT = ({
  logger: string,
  tags: string
}) => string;

export type getTagsFromMetaDataT = (metaData: metaDataT) => string;

export type loggerMethodsT = {|
  getLoggers: getLoggersT<string>,
  getPrefix: getPrefixT,
  getTagsFromMetaData: getTagsFromMetaDataT
|};

export type decorateClogysLoggersUsingPrefixT = (loggerMethods: loggerMethodsT, metaData: metaDataT) => LoggerT;
