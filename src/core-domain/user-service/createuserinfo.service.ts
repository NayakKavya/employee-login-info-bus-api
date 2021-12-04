import { HttpException, Injectable } from "@nestjs/common";
import { WinstonLoggerService } from "../../infrastructure/logger/winston-logger.service";
import { HttpClient } from "../../infrastructure/client/http.client";
import { LoginStatus, UserModel } from "../models/user.model";
import { IBaseService } from "./base.service";
import { ResponseCode } from "../../infrastructure/constants/response-code";

/* This Injectable service class contains createUserInfo service implementation for login */
@Injectable()
export default class CreateUserInfo implements IBaseService<UserModel, LoginStatus>{
    constructor(private httpclient: HttpClient,
        private logger: WinstonLoggerService,) {
        this.logger.setContext(CreateUserInfo.name);
        console.log('UpdateUserInfo created')
    }

    /** This method accepts userModel through UserController
    *  model is passed to system api to get user
    *  if the user is not found then userModel is sent to system api through http client post to create user detail
    *  if user is found then check browser and machine Id, matches then allows login else denies login */
    async handle(userModel: UserModel): Promise<LoginStatus> {
        this.logger.info(`in createUserInfo handle  #UserModel  ${userModel}`);
        this.logger.info('in createUserInfo handle info', { handle: userModel });

        let date: Date = new Date();

        userModel.loginDate = date;

        const responseObject = await this.httpclient.post('getUserInfo', userModel);

        this.logger.info('in createUserInfo handle ResponseObject', { handle: responseObject });

        if (responseObject.length === 0) {
            const users = await this.httpclient.post('save', userModel);
            this.logger.info('in createUserInfo handle Users', { handle: users });
            const um = new UserModel(users.userId, users.browser, users.machineId, users.shopId, users.userLogin, users.loginDate)
            const loginStatus = new LoginStatus(ResponseCode.SUCCESS, um)
            return loginStatus;
        }

        else {
            for (let obj of responseObject) {
                if (obj.userId === userModel.userId) {
                    if (obj.browser === userModel.browser && obj.machineId === userModel.machineId) {
                        this.logger.info('in createUserInfo handle else block', { handle: obj });
                        const loginStatus = new LoginStatus(ResponseCode.SUCCESS, obj)
                        return loginStatus
                    }
                    const msg = { code: ResponseCode.NO_ACCESS, message: 'User authentication credentials does not match, LOGGED_OUT' };
                    throw new HttpException(msg, 401);
                }
            }
        }

        return responseObject;
    }
}