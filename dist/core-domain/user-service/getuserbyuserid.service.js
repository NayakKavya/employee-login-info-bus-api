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
var GetUserByUserId_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const http_client_1 = require("../../infrastructure/client/http.client");
const winston_logger_service_1 = require("../../infrastructure/logger/winston-logger.service");
let GetUserByUserId = GetUserByUserId_1 = class GetUserByUserId {
    constructor(httpclient, logger) {
        this.httpclient = httpclient;
        this.logger = logger;
        this.logger.setContext(GetUserByUserId_1.name);
        console.log('UpdateLogoutInfo created');
    }
    async handle(getUserModel) {
        this.logger.info('in getUserByUserId handle  #GetUserModel  ${getUserModel}');
        this.logger.error('in getUserByUserId handle error', { key: 'value' });
        this.logger.debug('in getUserByUserId handle debug', { key: 'value' });
        this.logger.warn('in getUserByUserId handle warn');
        return await this.httpclient.get('all', getUserModel);
    }
};
GetUserByUserId = GetUserByUserId_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_client_1.HttpClient,
        winston_logger_service_1.WinstonLoggerService])
], GetUserByUserId);
exports.default = GetUserByUserId;
//# sourceMappingURL=getuserbyuserid.service.js.map