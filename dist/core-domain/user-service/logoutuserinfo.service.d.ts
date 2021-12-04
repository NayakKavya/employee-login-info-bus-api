import { WinstonLoggerService } from "../../infrastructure/logger/winston-logger.service";
import { HttpClient } from "../../infrastructure/client/http.client";
import { LogoutStatus, UserLogoutModel } from "../models/user.logout.model";
import { IBaseService } from "./base.service";
export default class LogoutUserInfo implements IBaseService<UserLogoutModel, LogoutStatus> {
    private httpclient;
    private logger;
    constructor(httpclient: HttpClient, logger: WinstonLoggerService);
    handle(userLogoutModel: UserLogoutModel): Promise<LogoutStatus>;
}
