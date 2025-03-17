/* eslint-disable no-console */

export const logDebug = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};

export const logError = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(...args);
  }
};

export const logInfo = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.info(...args);
  }
};

export const logWarn = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(...args);
  }
};

export const logTable = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.table(...args);
  }
};
