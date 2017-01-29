/* @flow */

// TODO: Until this issue is fixed
// https://github.com/facebook/flow/issues/3147
// import Clogy from './main/Clogy';

export type LevelsType = {
  log: number,
  trace: number,
  debug: number,
  info: number,
  warn: number,
  error: number,
  none: number
};

export type ClogyType = Object;

export type ClogyOptionsType = {
  showDateTime: ? boolean,
  prefix: ? string
};
