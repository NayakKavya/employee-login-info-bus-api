import { HttpClient } from "../../infrastructure/client/http.client";
import { WinstonLoggerService } from "../../infrastructure/logger/winston-logger.service";
import { GetUserModel } from "../models/getuser.model";
import { UserModel } from "../models/user.model";
import { IBaseService } from "./base.service";
export default class GetUserByUserId implements IBaseService<GetUserModel, UserModel> {
    private httpclient;
    private logger;
    constructor(httpclient: HttpClient, logger: WinstonLoggerService);
    handle(getUserModel: GetUserModel): Promise<UserModel[]>;
}
