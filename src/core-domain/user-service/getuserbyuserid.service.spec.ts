import { HttpModule, HttpService } from "@nestjs/axios";
import { Test } from "@nestjs/testing";
import { HttpClient } from "../../infrastructure/client/http.client";
import { ConfigService } from "../../infrastructure/configuration/config.service";
import { WinstonLoggerModule } from "../../infrastructure/logger/winston.logger.module";
import { UserController } from "../../routes/user.controller";
import CreateUserInfo from "./createuserinfo.service";
import GetUserByUserId from "./getuserbyuserid.service";
import LogoutUserInfo from "./logoutuserinfo.service";
import { AxiosResponse } from "axios";
import { of } from "rxjs";

describe('GetUserByUserId service', () => {
    let getUserByUserId: GetUserByUserId;
    let httpService: HttpService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [HttpModule,
                WinstonLoggerModule.forRoot({ level: ConfigService.create().getLogLevel() }),],
            controllers: [UserController],
            providers: [CreateUserInfo, GetUserByUserId, LogoutUserInfo, HttpClient]
        }).compile();

        getUserByUserId = module.get<GetUserByUserId>(GetUserByUserId);
        httpService = module.get<HttpService>(HttpService);
    });

    it('GetUserByUserId to be defined', async () => {
        expect(getUserByUserId).toBeDefined();
    });

    describe('GetUserBytUserId to be equal', () => {
        it('GetUserByUserId', async () => {
            let date = new Date()

            const data = [{
                "userId": "User17",
                "browser": "chrome",
                "machineId": "10.102.20.45",
                "shopId": 123,
                "userLogin": "login",
                "loginDate": date
            }]
            const result: AxiosResponse = await {
                data,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {},
            };

            const getUserService = {
                userId: "User17",
                shopId: 123
            };


            jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
            const res = await getUserByUserId.handle(getUserService)
            expect(res).toEqual(data)
        });
    })
});