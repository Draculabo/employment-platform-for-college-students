import { Logger, LoggerContext } from './Logger';
import { LoggerAPI, LoggerAPIv2, LoggerServer, LoggerService } from './LogContext';
import os from 'os';
import { LoggerAbstractPlugin } from './plugins/LoggerAbstractPlugin';
const baseContext = {
  hostname: os.hostname(),
};
const loggerPlugins = [] as any[];

export const createLoggerAPIv2 = <R extends LoggerContext>(context: Partial<LoggerAPIv2 & R>): Logger<LoggerAPIv2 & R> => {
  return new Logger<LoggerAPIv2 & R>(
    'api',
    {
      ...context,
      ...baseContext,
    },
    loggerPlugins as LoggerAbstractPlugin<LoggerAPIv2 & R>[]
  );
};
export { parseError } from './ParseError';
export * from './LogContext';
export { Logger };
export const loggerServer = new Logger<LoggerServer>(
  'server',
  {
    ...baseContext,
  },
  loggerPlugins
);

export const createLoggerService = <T extends string>(
  context: Partial<
    Omit<LoggerService<T>, 'requestID' | 'sessionID'> & {
      ids: IDS;
    }
  >
): Logger<LoggerService<T>> => {
  const { ids, ...rest } = context;
  const reqAndSesID = ids
    ? {
        requestID: ids.reqID,
        sessionID: ids.sesID,
      }
    : null;
  return new Logger<LoggerService<T>>(
    'service',
    // @ts-ignore
    {
      ...reqAndSesID,
      ...rest,
      ...baseContext,
    },
    loggerPlugins as LoggerAbstractPlugin<LoggerService<T>>[]
  );
};
