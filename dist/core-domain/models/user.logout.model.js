"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutStatus = exports.UserLogoutModel = void 0;
class UserLogoutModel {
    constructor(userId, browser, machineId, shopId, loginDate, logoutDate) {
        this.userId = userId;
        this.browser = browser;
        this.machineId = machineId;
        this.shopId = shopId;
        this.loginDate = loginDate;
        this.logoutDate = logoutDate;
    }
}
exports.UserLogoutModel = UserLogoutModel;
class LogoutStatus {
    constructor(statusCode, timestamp, path, message, responseCode) {
        this.statusCode = statusCode;
        this.timestamp = timestamp;
        this.path = path;
        this.message = message;
        this.responseCode = responseCode;
    }
}
exports.LogoutStatus = LogoutStatus;
//# sourceMappingURL=user.logout.model.js.map