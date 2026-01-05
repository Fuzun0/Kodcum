/**
 * Production-safe logger utility
 * Console.log'ları sadece development modda gösterir
 */

const isDev = __DEV__;

export const logger = {
  log: (...args: any[]) => {
    if (isDev) {
      console.log(...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },
  
  error: (...args: any[]) => {
    // Hatalar production'da da loglanır (error tracking için)
    console.error(...args);
  },
  
  info: (...args: any[]) => {
    if (isDev) {
      console.info(...args);
    }
  },
  
  debug: (...args: any[]) => {
    if (isDev) {
      console.debug(...args);
    }
  },
  
  group: (label: string) => {
    if (isDev && console.group) {
      console.group(label);
    }
  },
  
  groupEnd: () => {
    if (isDev && console.groupEnd) {
      console.groupEnd();
    }
  },
  
  table: (data: any) => {
    if (isDev && console.table) {
      console.table(data);
    }
  },
  
  time: (label: string) => {
    if (isDev && console.time) {
      console.time(label);
    }
  },
  
  timeEnd: (label: string) => {
    if (isDev && console.timeEnd) {
      console.timeEnd(label);
    }
  }
};

export default logger;
