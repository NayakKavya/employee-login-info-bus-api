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
const user_logout_model_1 = require("../models/user.logout.model");
const response_code_1 = require("../../infrastructure/constants/response-code");
let LogoutUserInfo = LogoutUserInfo_1 = class LogoutUserInfo {
    constructor(httpclient, logger) {
        this.httpclient = httpclient;
        this.logger = logger;
        this.logger.setContext(LogoutUserInfo_1.name);
        console.log('LogoutUserInfo created');
    }
    async handle(userLogoutModel) {
        this.logger.info(`in LogoutUserInfo handle  #UserLogoutModel  ${userLogoutModel}`);
        this.logger.info('in LogoutUserInfo handle info', { handle: userLogoutModel });
        let date = new Date();
        userLogoutModel.logoutDate = date;
        const found = await this.httpclient.post('getUserInfo', userLogoutModel);
        this.logger.info('in createUserInfo handle info found', { handle: found });
        for (let obj of await found) {
            this.logger.info('in createUserInfo handle info obj', { handle: obj });
            if (obj.userId === userLogoutModel.userId && obj.browser === userLogoutModel.browser &&
                obj.machineId === userLogoutModel.machineId) {
                userLogoutModel.loginDate = obj.loginDate;
                const res = await this.httpclient.post('logout', userLogoutModel);
                this.logger.info('in createUserInfo handle info res', { handle: res });
                const delres = await this.httpclient.delete('delUserInfo/' + userLogoutModel.userId + "/" + userLogoutModel.shopId);
                this.logger.info('in createUserInfo handle info delres', { handle: delres });
                const logoutStatus = new user_logout_model_1.LogoutStatus(200, date, '/logout', "User logged out successfully.", response_code_1.ResponseCode.LOGGED_OUT);
                return logoutStatus;
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