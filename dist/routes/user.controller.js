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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const getuser_model_1 = require("../core-domain/models/getuser.model");
const user_logout_model_1 = require("../core-domain/models/user.logout.model");
const user_model_1 = require("../core-domain/models/user.model");
const getuserbyuserid_service_1 = require("../core-domain/user-service/getuserbyuserid.service");
const logoutuserinfo_service_1 = require("../core-domain/user-service/logoutuserinfo.service");
const winston_logger_service_1 = require("../infrastructure/logger/winston-logger.service");
const createuserinfo_service_1 = require("../core-domain/user-service/createuserinfo.service");
let UserController = UserController_1 = class UserController {
    constructor(getUser, userInfo, logoutUserInfo, logger) {
        this.getUser = getUser;
        this.userInfo = userInfo;
        this.logoutUserInfo = logoutUserInfo;
        this.logger = logger;
        this.logger.setContext(UserController_1.name);
        console.log('User service controller');
    }
    getUserByUserId(userId, getUserModel) {
        getUserModel.userId = userId;
        this.logger.info(`in getUserByUserId info #UserId #ShopId ${getUserModel}`);
        this.logger.info('in getUserByUserId controller info', { getUserByUserId: getUserModel });
        return this.getUser.handle(getUserModel);
    }
    createUserInfo(userModel) {
        this.logger.info(`in createUserInfo info #UserModel  ${userModel}`);
        this.logger.info('in createUserInfo controller info', { createUserInfo: userModel });
        const loginStatus = this.userInfo.handle(userModel);
        return loginStatus;
    }
    logoutInfo(userLogoutModel) {
        this.logger.info(`in logoutInfo info #UserLogoutModel  ${userLogoutModel}`);
        this.logger.info('in logoutInfo controller info', { logoutInfo: userLogoutModel });
        const logoutStatus = this.logoutUserInfo.handle(userLogoutModel);
        return logoutStatus;
    }
};
__decorate([
    (0, common_1.Get)('/all/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, getuser_model_1.GetUserModel]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByUserId", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserInfo", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_logout_model_1.UserLogoutModel]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logoutInfo", null);
UserController = UserController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [getuserbyuserid_service_1.default,
        createuserinfo_service_1.default,
        logoutuserinfo_service_1.default,
        winston_logger_service_1.WinstonLoggerService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map