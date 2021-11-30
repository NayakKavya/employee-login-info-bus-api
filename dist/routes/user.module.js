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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const user_controller_1 = require("./user.controller");
const http_client_1 = require("../infrastructure/client/http.client");
const createuserinfo_service_1 = require("../core-domain/user-service/createuserinfo.service");
const getuserbyuserid_service_1 = require("../core-domain/user-service/getuserbyuserid.service");
const logoutuserinfo_service_1 = require("../core-domain/user-service/logoutuserinfo.service");
const winston_logger_module_1 = require("../infrastructure/logger/winston.logger.module");
const config_service_1 = require("../infrastructure/configuration/config.service");
let UserModule = class UserModule {
    constructor() {
        console.log('User Module Created');
    }
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule,
            winston_logger_module_1.WinstonLoggerModule.forRoot({ level: config_service_1.ConfigService.create().getLogLevel() }),],
        controllers: [user_controller_1.UserController],
        providers: [createuserinfo_service_1.default, getuserbyuserid_service_1.default, logoutuserinfo_service_1.default, http_client_1.HttpClient],
    }),
    __metadata("design:paramtypes", [])
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map