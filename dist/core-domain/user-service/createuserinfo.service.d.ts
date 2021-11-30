import { WinstonLoggerService } from "../../infrastructure/logger/winston-logger.service";
import { HttpClient } from "../../infrastructure/client/http.client";
import { LoginStatus, UserModel } from "../models/user.model";
import { IBaseService } from "./base.service";
export default class CreateUserInfo implements IBaseService<UserModel, LoginStatus> {
    private httpclient;
    private logger;
    constructor(httpclient: HttpClient, logger: WinstonLoggerService);
    handle(userModel: UserModel): Promise<LoginStatus>;
}
