import { Injectable } from "@nestjs/common";
import { HttpClient } from "../../infrastructure/client/http.client";
import { WinstonLoggerService } from "../../infrastructure/logger/winston-logger.service";
import { GetUserModel } from "../models/getuser.model";
import { UserModel } from "../models/user.model";
import { IBaseService } from "./base.service";

/**This Injectable service class contains getUserById service implementation for fetching User by particular 
 * userId and shopId */
@Injectable()
export default class GetUserByUserId implements IBaseService<GetUserModel, UserModel>{
    constructor(private httpclient: HttpClient,
        private logger: WinstonLoggerService,) {
        this.logger.setContext(GetUserByUserId.name);
        console.log('GetUserByUserId created')
    }

    /** This method accepts getUserModel and pass it to system api through httpclient post
    * and receives and returns user*/
    async handle(getUserModel: GetUserModel): Promise<UserModel[]> {
        this.logger.info(`in getUserByUserId handle  #GetUserModel  ${getUserModel}`);
        this.logger.info('in getUserByUserId handle info', { handle: getUserModel });
        return await this.httpclient.post('all', getUserModel);
    }
}