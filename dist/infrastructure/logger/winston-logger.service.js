"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleTransport = exports.WinstonLoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston = require("winston");
const winston_logger_constants_1 = require("./winston-logger.constants");
const os = require("os");
let WinstonLoggerService = class WinstonLoggerService {
    constructor(options) {
        this.options = options;
        this.context = '';
        const _a = this.options, { level, format, transports } = _a, opts = __rest(_a, ["level", "format", "transports"]);
        const myFormat = winston.format.printf((_a) => {
            var { level, message, timestamp } = _a, metadata = __rest(_a, ["level", "message", "timestamp"]);
            let msg = `${timestamp} [${level}] : ${message} `;
            if (metadata) {
                msg += JSON.stringify(metadata);
            }
            return msg;
        });
        console.log('level', level);
        this.logger = winston.createLogger(Object.assign({ level: level || 'info', silent: options.silent || false, format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.splat(), myFormat), transports: [new winston.transports.Console({ handleExceptions: true }), new (winston.transports.File)({ filename: 'app.log' })] }, opts));
    }
    logToWinston(level, message, ...meta) {
        const logger = this.logger;
        if (logger) {
            logger.log(Object.assign({ pid: process.pid, hostname: os.hostname(), level: level, message: message, context: this.context }, (meta.length >= 1 && {
                extra: meta,
            })));
        }
    }
    setContext(context) {
        this.context = context;
    }
    info(message, meta) {
        this.logToWinston('info', message, meta);
    }
    debug(message, meta) {
        this.logToWinston('debug', message, meta);
    }
    warn(message, meta) {
        this.logToWinston('warn', message, meta);
    }
    error(message, meta) {
        this.logToWinston('error', message, meta);
    }
};
WinstonLoggerService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, common_1.Inject)(winston_logger_constants_1.WINSTON_LOGGER_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], WinstonLoggerService);
exports.WinstonLoggerService = WinstonLoggerService;
exports.consoleTransport = new winston.transports.Stream({
    stream: process.stdout,
    handleExceptions: true,
    format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), winston.format.json({ space: 2 }), winston.format.logstash(), winston.format.metadata()),
});
//# sourceMappingURL=winston-logger.service.js.map