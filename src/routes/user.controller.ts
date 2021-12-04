import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { GetUserModel } from "../core-domain/models/getuser.model";
import { LogoutStatus, UserLogoutModel } from "../core-domain/models/user.logout.model";
import { LoginStatus, UserModel } from "../core-domain/models/user.model";
import GetUserByUserId from "../core-domain/user-service/getuserbyuserid.service";
import LogoutUserInfo from "../core-domain/user-service/logoutuserinfo.service";
import { WinstonLoggerService } from "../infrastructure/logger/winston-logger.service";
import CreateUserInfo from "../core-domain/user-service/createuserinfo.service";

@Controller()
export class UserController {
    constructor(
        private getUser: GetUserByUserId,
        private userInfo: CreateUserInfo,
        private logoutUserInfo: LogoutUserInfo,
        private logger: WinstonLoggerService,
    ) {
        this.logger.setContext(UserController.name);
        console.log('User service controller')
    }

    @Get('/all/:userId')
    getUserByUserId(@Param('userId') userId: string, @Body() getUserModel: GetUserModel): Promise<UserModel[]> {
        getUserModel.userId = userId;
        this.logger.info(`in getUserByUserId info #UserId #ShopId ${getUserModel}`);
        this.logger.info('in getUserByUserId controller info', { getUserByUserId: getUserModel });
        return this.getUser.handle(getUserModel);
    }

    @Post('/login')
    createUserInfo(@Body() userModel: UserModel): Promise<LoginStatus> {
        this.logger.info(`in createUserInfo info #UserModel  ${userModel}`);
        this.logger.info('in createUserInfo controller info', { createUserInfo: userModel });
        const loginStatus = this.userInfo.handle(userModel);
        return loginStatus;
    }

    @Post('/logout')
    logoutInfo(@Body() userLogoutModel: UserLogoutModel): Promise<LogoutStatus> {
        this.logger.info(`in logoutInfo info #UserLogoutModel  ${userLogoutModel}`);
        this.logger.info('in logoutInfo controller info', { logoutInfo: userLogoutModel });
        const logoutStatus = this.logoutUserInfo.handle(userLogoutModel)
        return logoutStatus;
    }
}


