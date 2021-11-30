"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var WinstonLoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLoggerModule = void 0;
const common_1 = require("@nestjs/common");
const winston_logger_constants_1 = require("./winston-logger.constants");
const winston_logger_service_1 = require("./winston-logger.service");
let WinstonLoggerModule = WinstonLoggerModule_1 = class WinstonLoggerModule {
    static forRoot(options) {
        const { isGlobal } = options, useValue = __rest(options, ["isGlobal"]);
        return {
            module: WinstonLoggerModule_1,
            global: isGlobal,
            providers: [
                { provide: winston_logger_constants_1.WINSTON_LOGGER_MODULE_OPTIONS, useValue },
                winston_logger_service_1.WinstonLoggerService,
            ],
            exports: [winston_logger_service_1.WinstonLoggerService],
        };
    }
    static forRootAsync(options) {
        return {
            module: WinstonLoggerModule_1,
            global: options.isGlobal,
            imports: options.imports || [],
            providers: [
                {
                    provide: winston_logger_constants_1.WINSTON_LOGGER_MODULE_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                winston_logger_service_1.WinstonLoggerService,
            ],
            exports: [winston_logger_service_1.WinstonLoggerService],
        };
    }
};
WinstonLoggerModule = WinstonLoggerModule_1 = __decorate([
    (0, common_1.Module)({})
], WinstonLoggerModule);
exports.WinstonLoggerModule = WinstonLoggerModule;
//# sourceMappingURL=winston.logger.module.js.map