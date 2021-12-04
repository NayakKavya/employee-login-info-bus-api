import { GetUserModel } from "../core-domain/models/getuser.model";
import { LogoutStatus, UserLogoutModel } from "../core-domain/models/user.logout.model";
import { LoginStatus, UserModel } from "../core-domain/models/user.model";
import GetUserByUserId from "../core-domain/user-service/getuserbyuserid.service";
import LogoutUserInfo from "../core-domain/user-service/logoutuserinfo.service";
import { WinstonLoggerService } from "../infrastructure/logger/winston-logger.service";
import CreateUserInfo from "../core-domain/user-service/createuserinfo.service";
export declare class UserController {
    private getUser;
    private userInfo;
    private logoutUserInfo;
    private logger;
    constructor(getUser: GetUserByUserId, userInfo: CreateUserInfo, logoutUserInfo: LogoutUserInfo, logger: WinstonLoggerService);
    getUserByUserId(userId: string, getUserModel: GetUserModel): Promise<UserModel[]>;
    createUserInfo(userModel: UserModel): Promise<LoginStatus>;
    logoutInfo(userLogoutModel: UserLogoutModel): Promise<LogoutStatus>;
}
