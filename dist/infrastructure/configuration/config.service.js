"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv = require("dotenv");
dotenv.config();
class ConfigService {
    constructor(env) {
        this.env = env;
        console.log('svc created');
    }
    static create() {
        if (!this.svc) {
            this.svc = new ConfigService(process.env);
        }
        return this.svc;
    }
    getValue(key, throwOnMissing = true) {
        const value = process.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }
    getPort() {
        return this.getValue('API_GATEWAY_PORT', true);
    }
    isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }
    ensureValues(keys) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }
    getBaseURl(key) {
        return this.getValue(key, true);
    }
    getLogLevel() {
        const level = this.getValue('ORDER_LOG_LEVEL', false);
        return level;
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map