// Type definitions for clogy
// Project: https://github.com/pgmanutd/clogy
// Definitions by: Prashant Goel <https://github.com/pgmanutd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare type ClogyOptionsType = {
  showDateTime?: boolean,
  prefix?: string
};

declare type LevelsType = {
  log: number,
  trace: number,
  debug: number,
  info: number,
  warn: number,
  error: number,
  none: number
};

interface ILogger {
  getOptions(): ClogyOptionsType;
  setOptions(options: ClogyOptionsType): void;
  getLevel(): number | null;
  setLevel(level: number | string): void;
  stringifyAllowedLoggers(): string;
  enableAllLevels(): void;
  disableAllLevels(): void;
  LEVELS: LevelsType;
  log(...args: Array<any>): void;
  trace(...args: Array<any>): void;
  debug(...args: Array<any>): void;
  info(...args: Array<any>): void;
  warn(...args: Array<any>): void;
  error(...args: Array<any>): void;
}

interface IClogy extends ILogger {
  new(): this;
  noConflict(): this;
  decorator(decoFunc: () => void): void;
}

declare const clogy: IClogy;

declare module 'clogy' {
  export = clogy
}
