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
var LogoutUserInfo_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const winston_logger_service_1 = require("../../infrastructure/logger/winston-logger.service");
const http_client_1 = require("../../infrastructure/client/http.client");
let LogoutUserInfo = LogoutUserInfo_1 = class LogoutUserInfo {
    constructor(httpclient, logger) {
        this.httpclient = httpclient;
        this.logger = logger;
        this.logger.setContext(LogoutUserInfo_1.name);
        console.log('LogoutUserInfo created');
    }
    async handle(userLogoutModel) {
        this.logger.info('in LogoutUserInfo handle  #UserLogoutModel  ${userLogoutModel}');
        this.logger.error('in LogoutUserInfo handle error', { key: 'value' });
        this.logger.debug('in LogoutUserInfo handle debug', { key: 'value' });
        this.logger.warn('in LogoutUserInfo handle warn');
        let date = new Date();
        console.log('Date Login', date);
        userLogoutModel.logoutDate = date;
        console.log('*************************', userLogoutModel);
        const found = await this.httpclient.post('getUserInfo', userLogoutModel);
        console.log('Found', found);
        for (let obj of await found) {
            console.log('Inside for for loop');
            console.log('UserModel**(((', userLogoutModel.userId, userLogoutModel.browser, userLogoutModel.machineId, userLogoutModel.shopId);
            console.log('%%%%%%%%%BJ', obj);
            console.log('%-----', obj.userId, obj.browser, obj.machineId, obj.shopId);
            if (obj.userId === userLogoutModel.userId && obj.browser === userLogoutModel.browser &&
                obj.machineId === userLogoutModel.machineId) {
                console.log('inside if block logout');
                userLogoutModel.loginDate = obj.loginDate;
                console.log('User&&&');
                const res = await this.httpclient.post('logout', userLogoutModel);
                console.log('Res++++', res);
                const delres = await this.httpclient.delete('delUserInfo/' + userLogoutModel.userId + "/" + userLogoutModel.shopId);
                console.log('delRes++++', delres);
                return res;
            }
        }
    }
};
LogoutUserInfo = LogoutUserInfo_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_client_1.HttpClient,
        winston_logger_service_1.WinstonLoggerService])
], LogoutUserInfo);
exports.default = LogoutUserInfo;
//# sourceMappingURL=logoutuserinfo.service.js.map