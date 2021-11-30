"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginStatus = exports.UserModel = void 0;
class UserModel {
    constructor(userId, browser, machineId, shopId, userLogin, loginDate) {
        this.userId = userId;
        this.browser = browser;
        this.machineId = machineId;
        this.shopId = shopId;
        this.userLogin = userLogin;
        this.loginDate = loginDate;
    }
}
exports.UserModel = UserModel;
class LoginStatus {
    constructor(status, response) {
        this.status = status;
        this.response = response;
    }
}
exports.LoginStatus = LoginStatus;
//# sourceMappingURL=user.model.js.map