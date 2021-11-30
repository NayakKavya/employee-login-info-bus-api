export declare class ConfigService {
    private env;
    private static svc;
    static create(): ConfigService;
    private constructor();
    private getValue;
    getPort(): string;
    isProduction(): boolean;
    ensureValues(keys: string[]): this;
    getBaseURl(key: string): string;
    getLogLevel(): string;
}
