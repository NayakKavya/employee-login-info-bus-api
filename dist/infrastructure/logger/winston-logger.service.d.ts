import * as winston from 'winston';
import { WinstonLoggerModuleOptions } from './interfaces/winston-logger-options.interface';
export declare class WinstonLoggerService {
    private options;
    private logger;
    private context;
    constructor(options: WinstonLoggerModuleOptions);
    private logToWinston;
    setContext(context: string): void;
    info(message?: string, meta?: any): void;
    debug(message?: string, meta?: any): void;
    warn(message?: string, meta?: any): void;
    error(message?: string, meta?: any): void;
}
export declare const consoleTransport: winston.transports.StreamTransportInstance;
export declare type LogLevel = 'error' | 'warn' | 'verbose' | 'info' | 'debug' | 'silly';
