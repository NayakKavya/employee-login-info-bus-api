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
var CreateUserInfo_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const winston_logger_service_1 = require("../../infrastructure/logger/winston-logger.service");
const http_client_1 = require("../../infrastructure/client/http.client");
const user_model_1 = require("../models/user.model");
const error_code_1 = require("../../infrastructure/constants/error-code");
let CreateUserInfo = CreateUserInfo_1 = class CreateUserInfo {
    constructor(httpclient, logger) {
        this.httpclient = httpclient;
        this.logger = logger;
        this.logger.setContext(CreateUserInfo_1.name);
        console.log('UpdateUserInfo created');
    }
    async handle(userModel) {
        this.logger.info('in createUserInfo handle  #UserModel  ${userModel}');
        this.logger.error('in createUserInfo handle error', { key: 'value' });
        this.logger.debug('in createUserInfo handle debug', { key: 'value' });
        this.logger.warn('in createUserInfo handle warn');
        let date = new Date();
        const responseObject = await this.httpclient.post('getUserInfo', userModel);
        console.log("response obj", responseObject);
        console.log("Model", userModel);
        if (responseObject.length === 0) {
            console.log("New User");
            const users = await this.httpclient.post('save', userModel);
            console.log("New User logged in", users);
            const um = new user_model_1.UserModel(users.userId, users.browser, users.machineId, users.shopId, users.userLogin, users.loginDate);
            const loginStatus = new user_model_1.LoginStatus("SUCCESS", um);
            return loginStatus;
        }
        else {
            for (let obj of responseObject) {
                if (obj.userId === userModel.userId) {
                    if (obj.browser === userModel.browser && obj.machineId === userModel.machineId) {
                        const loginStatus = new user_model_1.LoginStatus("SUCCESS", obj);
                        return loginStatus;
                    }
                    const msg = { code: error_code_1.ErrorCode.NO_ACCESS, message: 'User authentication credentials does not match, LOGGED_OUT' };
                    throw new common_1.HttpException(msg, 401);
                }
            }
        }
        return responseObject;
    }
};
CreateUserInfo = CreateUserInfo_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_client_1.HttpClient,
        winston_logger_service_1.WinstonLoggerService])
], CreateUserInfo);
exports.default = CreateUserInfo;
//# sourceMappingURL=createuserinfo.service.js.map