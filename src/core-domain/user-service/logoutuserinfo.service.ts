import { Injectable } from "@nestjs/common";
import { WinstonLoggerService } from "../../infrastructure/logger/winston-logger.service";
import { HttpClient } from "../../infrastructure/client/http.client";
import { LogoutStatus, UserLogoutModel } from "../models/user.logout.model";
import { IBaseService } from "./base.service";
import { ResponseCode } from "../../infrastructure/constants/response-code";


/**  This Injectable service class contains logoutUserInfo service implementation for logout */
@Injectable()
export default class LogoutUserInfo implements IBaseService<UserLogoutModel, LogoutStatus>{
    constructor(private httpclient: HttpClient,
        private logger: WinstonLoggerService,) {
        this.logger.setContext(LogoutUserInfo.name);
        console.log('LogoutUserInfo created')
    }

    /** This method receives userLogoutModel through UserController
    *   fetches user details using userLogoutModel and sends it to system api to save using httpclient post
    *   then sends userId and shopId to system api to delete user using httpcient delete*/
    async handle(userLogoutModel: UserLogoutModel): Promise<LogoutStatus> {

        this.logger.info(`in LogoutUserInfo handle  #UserLogoutModel  ${userLogoutModel}`);
        this.logger.info('in LogoutUserInfo handle info', { handle: userLogoutModel });

        let date: Date = new Date();
        userLogoutModel.logoutDate = date;

        const found = await this.httpclient.post('getUserInfo', userLogoutModel);

        this.logger.info('in createUserInfo handle info found', { handle: found });

        for (let obj of await found) {
            this.logger.info('in createUserInfo handle info obj', { handle: obj });
            if (obj.userId === userLogoutModel.userId && obj.browser === userLogoutModel.browser &&
                obj.machineId === userLogoutModel.machineId) {

                userLogoutModel.loginDate = obj.loginDate;


                const res = await this.httpclient.post('logout', userLogoutModel)

                this.logger.info('in createUserInfo handle info res', { handle: res });

                const delres = await this.httpclient.delete('delUserInfo/' + userLogoutModel.userId + "/" + userLogoutModel.shopId);

                this.logger.info('in createUserInfo handle info delres', { handle: delres });

                const logoutStatus = new LogoutStatus(200, date, '/logout', "User logged out successfully.", ResponseCode.LOGGED_OUT)
                return logoutStatus;

            }

        }

    }

}