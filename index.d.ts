// Type definitions for clogy
// Project: https://github.com/pgmanutd/clogy
// Definitions by: Prashant Goel <https://github.com/pgmanutd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

type ClogyOptionsT = {
  showDateTime?: boolean,
  prefix?: string
};

type ClogyLevelsT = {
  log: number,
  trace: number,
  debug: number,
  info: number,
  warn: number,
  error: number,
  none: number
};

interface IClogyLogger {
  getOptions(): ClogyOptionsT;
  setOptions(options: ClogyOptionsT): void;
  getLevel(): number | null;
  setLevel(level: number | string): void;
  stringifyAllowedLoggers(): string;
  enableAllLevels(): void;
  disableAllLevels(): void;
  LEVELS: ClogyLevelsT;
  log(...args: Array<any>): void;
  trace(...args: Array<any>): void;
  debug(...args: Array<any>): void;
  info(...args: Array<any>): void;
  warn(...args: Array<any>): void;
  error(...args: Array<any>): void;
}

interface IClogyMain extends IClogyLogger {
  noConflict(): IClogyMain;
  decorator(decoFunc: () => void): void;
}

declare const clogy: IClogyMain;

declare module 'clogy' {
  export = clogy
}
