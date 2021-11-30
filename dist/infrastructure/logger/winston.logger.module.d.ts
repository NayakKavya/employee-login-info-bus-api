import { DynamicModule } from '@nestjs/common';
import { WinstonLoggerModuleAsyncOptions, WinstonLoggerModuleOptions } from './interfaces/winston-logger-options.interface';
export declare class WinstonLoggerModule {
    static forRoot(options: WinstonLoggerModuleOptions): DynamicModule;
    static forRootAsync(options: WinstonLoggerModuleAsyncOptions): DynamicModule;
}
